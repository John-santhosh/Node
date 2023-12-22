const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// check like a water fall from top '/' to bottom '/*'

//app.get('^/$|index(.html)?'. (req, res) => {
// supports regEx like above.
app.get("/", (req, res) => {
  //  res.sendFile("./views/index.html", {
  //    root: __dirname,
  //  });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// making .html optional and telling the server to respond with or without .html extension.
app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  // 301 permanently moved
  res.redirect(301, "/new-page.html"); // 302 by default
});

// Route handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempt to load hello ");
    // we can chain function using next().
    next();
  },
  (req, res) => {
    // the last one doesn't have a next() function
    res.send("hello world!");
  }
);

// chain route handlers

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("finished");
};

app.get("/chain.html", [one, two, three]);
// ^^

app.get("/*", (req, res) => {
  // we have to send 404 because the server does know the request resource does not found.
  res.status(404).res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`server starter on port ${PORT}`));
