const express = require("express");
const app = express();
const path = require("path");
const { logEvents, logger } = require("./middlewares/logEvents");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");
const verifyJWT = require("./middlewares/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middlewares/credential");

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

//handle options credentials check - before CORS!
// and fetch cookies credentials requirements
app.use(credentials);

// 3rd party middleware
app.use(cors(corsOptions));

// urlencoded data => formData
app.use(express.urlencoded({ extended: false }));
// ^^ app.use is what we use to apply middleware to all routes that are comin in. just like our http methods like app.(get,post,put).

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files like images, css , text files
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// check the routes like a water fall from top '/' to bottom '/*'

// Routes
app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// we have to move all the routes which need to protected below the verifyJWT()
// function since the flow is like the water fall if the verifyJWT() fails it
// wont go further down

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employee"));
// app.use();

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
