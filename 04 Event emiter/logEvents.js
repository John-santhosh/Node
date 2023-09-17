const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;

  // \t => 8spaces
  const logTime = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logTime);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLogs.txt"),
      logTime
    );
  } catch (error) {
    console.log(error);
  }
};
// console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"));

// console.log(uuid());

module.exports = logEvents;
