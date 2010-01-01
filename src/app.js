// Import Libraries
const express = require("express");
const chalk = require("chalk");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");

// Functions
const functions = require("./utils/functions.js");

// Shortened Variables
const app = express();
const port = process.env.PORT || 3000;

// Define Paths
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set hbs views engine
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

// Set front end folder (Static Files)
app.use(express.static(publicPath));

// Main Content
// Index page
app.get("", (req, res) => {
  res.render("index", {
    name: "CABINET",
  });
});

app.get("/login", (req, res) => {
  // Login
  const username = req.query.username;
  const password = req.query.password;

  // Fetch user and find target
  const users = functions.readUsers()[0].users;
  const target = users.find(
    (user) => user.username === username && user.password === password
  );

  // Fetch notifications
  const notification = functions.readNot();

  // Fetch schedule
  const schedule = functions.readSch();
  const schTarget = schedule.find((item) => item.username === username);

  // Fetch students
  const students = functions.students();
  const studentsTarget = students.find((item) => item.username === username);

  if (target) {
    console.log(chalk.yellow("User Found || Refresh Successfull"));
    return res.send({
      // User Database
      username: target.username,
      message: "Welcome " + target.name,
      name: target.name,
      feild: target.feild,
      age: target.age || "Not Added",
      address: target.address || "Not Added",
      phone: target.phone || "Not Added",
      mail: target.mail || "Not Added",
      password: target.password || "Not Added",

      // Notifiation Dtatabase
      notification,

      // Schedule Database
      schedule: schTarget,

      // students Database
      students: studentsTarget,
    });
  } else {
    console.log(chalk.red("Username || Password incorect"));
    res.send({ error: "Username || Password incorect" });
  }
});

app.get("/editUser", (req, res) => {
  const username = req.query.username;
  const name = req.query.name;
  const age = req.query.age;
  const address = req.query.address;
  const feild = req.query.feild;
  const mail = req.query.mail;
  const phone = req.query.phone;

  // Edit user details
  const db = functions.readUsers();
  const dbUsers = functions.readUsers()[0].users;
  const userToEdit = dbUsers.find((user) => user.username === username);

  if (!userToEdit) {
    console.log("User Not Found!");
  } else {
    // Edit details
    if (name) {
      userToEdit.name = name;
    }
    if (age) {
      userToEdit.age = age;
    }
    if (address) {
      userToEdit.address = address;
    }
    if (feild) {
      userToEdit.feild = feild;
    }
    if (mail) {
      userToEdit.mail = mail;
    }
    if (phone) {
      userToEdit.phone = phone;
    }

    console.log(userToEdit);

    // Push details
    db.pop();
    db.push({
      users: dbUsers,
    });
    const editedData = JSON.stringify(db);
    fs.writeFileSync(__dirname + "/utils/db/users.json", editedData, "utf-8");

    return res.send({
      success: "Edited Successfully",
      newInfo: userToEdit,
    });
  }
});

app.get("/editSch", (req, res) => {
  const username = req.query.username;
  const schDay = req.query.schDay;
  const schPeriod = req.query.schPeriod;
  const schContent = req.query.schContent;

  const schedule = functions.readSch();
  const schTarget = schedule.find((item) => item.username === username);

  schTarget[schDay][schPeriod] = schContent;
  const editedData = JSON.stringify(schedule);

  fs.writeFileSync(
    __dirname + "/utils/db/classSchedule.json",
    editedData,
    "utf-8"
  );

  res.send({
    message: "Successfully modified entries!",
  });
});

app.get("/deleteSch", (req, res) => {
  const username = req.query.username;
  const period = req.query.period;
  const day = req.query.day;

  const schedule = functions.readSch();
  const target = schedule.find((item) => item.username === username);

  target[day][period] = "Free@Period";

  const newData = JSON.stringify(schedule);

  fs.writeFileSync(
    __dirname + "/utils/db/classSchedule.json",
    newData,
    "utf-8"
  );
  res.send({
    message: "Route listening!",
  });
});
// Handle 404 & App listen
// ...
// ...
// ...

app.get("/*", (req, res) => {
  res.render("404", {
    name: "CABINET",
  });
});

// Run App
app.listen(port, () => {
  console.log("App Running...");
});
