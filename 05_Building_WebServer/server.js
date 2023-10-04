const logEvents = require("./logEvents");
const EventEmitter = require("events");
const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

// as per docs
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      contentType.includes("image") ? "" : "utf8"
    ); // because the images does not have the same encoding as text
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    // statusCode
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.log(error);
    myEmitter.emit("log", `${err.name}: ${err.method}`, "reqLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  // this is not a very efficient way
  // let filePath;

  // if (req.url === "/" || req.url === "index.html") {
  //   res.statusCode === 200;
  //   res.setHeader("content-type", "text/html");
  //   filePath = path.join(__dirname, "views", "index.html");
  //   fs.readFileSync(path, "utf8", (err, data) => {
  // used to quick;y end the response of the data
  // ref => https://stackoverflow.com/questions/29555290/what-is-the-difference-between-res-end-and-res-send
  //     res.end(data);
  //   });
  // }

  // all about path.extname => https://nodejs.org/api/path.html#pathextnamepath
  const extension = path.extname(req.url);
  // console.log(path.extname(req.url));
  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    // the default is text/html because the case could just be "/" or doesn't have an extension at all
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // console.log("filePath:", filePath);

  // makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  // console.log(filePath);
  // console.log(req.url.slice(-1));

  //check if the filepath exists
  const fileExist = fs.existsSync(filePath);

  if (fileExist) {
    //serve the file
    serveFile(filePath, contentType, res);
  } else {
    //404 not found
    //301 redirect

    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        //serve a 404 response
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => console.log(`server starter on port ${PORT}`));
