const express = require("express");
const app = express();
const path = require("path");
const { logEvents, logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
// What is middleware?
// it is anything that is in between the req and response
// we can call the route handlers the callback function which has (req, res) are teh route handlers they can be single or it can be chained.

// Types of middleware.
/*
 * built-in
 * custom-middleware (is what we create ourself).
 * middleware from 3rd parties.
 */

// built-in middleware to handle urlencoded data.
// in other words 'FORM' data.
// 'content-type: application/x-www-from-url-encoded'

// ++$$$** the falls like waterfall from top to bottom **$$$++

// custom middleware
app.use(logger);

// 3rd party middleware
const whiteList = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "https://www.thunderclient.com",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// urlencoded data => formData
app.use(express.urlencoded({ extended: false }));
// ^^ app.use is what we use to apply middleware to all routes that are comin in. just like our http methods like app.(get,post,put).

// built-in middleware for json
app.use(express.json());

// serve static files like images, css , text files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// check the routes like a water fall from top '/' to bottom '/*'

// Routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employee"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

// CUSTOM ERROR MIDDLEWARE
app.use(errorHandler);

app.listen(PORT, () => console.log(`server starter on port ${PORT}`));
errorHandler;
