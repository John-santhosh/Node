const logEvents = require("./logEvents");

// Node.js has a built-in module, called "Events", where you can create-, fire-, and listen for- your own events.
const EventEmitter = require("events");

// as per docs
class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
  // this will emit the event for every 2 seconds
  myEmitter.emit("log", "log event emitted!");
}, 2000);
