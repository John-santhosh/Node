const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.join(__dirname, "files", "replay.txt"), {
  encoding: "utf8",
});

const ws = fs.createWriteStream(
  path.join(__dirname, "files", "newReplay1.txt")
);

// listening for the data which is coming into the readable string(rs)
// rs.on("data", (dataChuck) => {
//   ws.write(dataChuck);
// });

// there is even a more efficient way of the doing the above code
// this is do the same action as above
rs.pipe(ws);
