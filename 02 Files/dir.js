const fs = require("fs");

// creating a new directory
// fs.mkdir("./newDir", (err) => {
//   if (err) throw err;
//   console.log("directory created");
// });

// to check if a directory/file is available there
console.log(fs.existsSync("./files/replay.txt"));

if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("directory created");
  });
}

// Remove a directory
if (!fs.existsSync("./new")) {
  fs.rmdir("./new", (err) => {
    if (err) throw err;
    console.log("directory removed");
  });
}
