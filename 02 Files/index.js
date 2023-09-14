// filesystem common module for file operations
const fs = require("fs");
const path = require("path");

// reading a file
fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  //either specify encoding here or while logging console.log(data.toString());
  "utf-8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);

// the below code looks like, it is making a CB hell
//write to a file
// fs.writeFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "Write from node",
//   (err) => {
//     if (err) throw err;
//     console.log("write completed");

//     // append text
//     fs.appendFile(
//       path.join(__dirname, "files", "starter.txt"),
//       "\n\n append from node to next line ",
//       (err) => {
//         if (err) throw err;
//         console.log("append successful");

//         //rename a file
//         fs.rename(
//           path.join(__dirname, "files", "starter.txt"),
//           path.join(__dirname, "files", "newStarter1.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("append successful");
//           }
//         );
//       }
//     );
//   }
// );

// alternatively to avoid CB hell we can use async and await since this fs operations are asynchronous.
const fsPromises = require("fs").promises;

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseWriter.txt"),
      "utf8"
    );
    console.log(data);

    //deleting a file
    await fsPromises.unlink(path.join(__dirname, "files", "promiseWriter.txt"));

    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWriter.txt"),
      data
    );

    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWriter.txt"),
      "\n\n Nice to meet you"
    );

    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWriter.txt"),
      path.join(__dirname, "files", "promiseWriterRenamed.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseWriterRenamed.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (error) {
    console.log(error);
  }
};

fileOps();

process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught err: ${err}`);
  process.exit(1);
});
