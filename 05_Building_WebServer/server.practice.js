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

const serve = http.createServer((req, res) => {
  console.log({ req: req.url, res: req.method });
  // res;
  let filePath;
  if (req.url === "/" || req.url === "index.html") {
    res.statusCode === 200;
    res.setHeader("content-type", "text/html");
    filePath = path.join(__dirname, "views", "index.html");
    fs.readFile(filePath, "utf8", (err, data) => {
      // console.log(data);
      res.end(data);
    });
  } else {
    fs.readFile(path.join(__dirname, req.url), "utf8", (err, data) => {
      console.log({ data });
      res.end(data);
    });
    // console.log({res});
  }
});

serve.listen(PORT, () => console.log(`server running on port: ${PORT}`));
