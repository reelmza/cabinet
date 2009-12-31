const fs = require("fs");

const readUsers = () => {
  try {
    const getFile = fs.readFileSync(__dirname + "/db/users.json");
    const buffer = getFile.toString();

    return JSON.parse(buffer);
  } catch (e) {
    return e;
  }
};

const readNot = () => {
  try {
    const getFile = fs.readFileSync(__dirname + "/db/notification.json");
    const buffer = getFile.toString();

    return JSON.parse(buffer);
  } catch (e) {
    return e;
  }
};

const readSch = () => {
  try {
    const getFile = fs.readFileSync(__dirname + "/db/classSchedule.json");
    const buffer = getFile.toString();

    return JSON.parse(buffer);
  } catch (e) {
    return e;
  }
};

module.exports = {
  readUsers: readUsers,
  readNot: readNot,
  readSch: readSch,
};
