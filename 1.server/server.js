// 1) node runs on server - not in the browser
// 2) the console is the terminal (cmd) window
console.log("hello World");

//3) global object instead of window object
// global obj in node is much smaller than the window obj.
// console.log(global);

// 4) has common core modules
//5) commonjs modules instead of ES6
// 6) missing some apis like fetch

// ### Node js is missijohnsantosh007@gmail.comng js API's like fetch though we can use external packages to make it available.  ###

const os = require("os");
const path = require("path");

// destructuring math
const { add, sub, mul, div } = require("./math");

console.log(add(5, 3));

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

// gives the same result as __dirname (gives the directory structure of the file location)
console.log(path.dirname(__filename));
// gives only the file name with extension
console.log(path.basename(__filename));
//gives only the extension of the current file
console.log(path.extname(__filename));
// gives every info about the file in an object which containing information about the file.
console.log(path.parse(__filename));
