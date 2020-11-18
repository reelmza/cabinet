// Import Libraries
const express = require("express");
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
  var error;
  const username = req.query.username;
  const password = req.query.password;

  const users = functions.readUsers()[0].users;
  const target = users.find(
    (user) => user.username === username && user.password === password
  );

  if (target) {
    console.log("user Found");
    return res.send({
      username: target.username,
      message: "Welcome " + target.name,
      name: target.name,
      feild: target.feild,
      age: target.age || "Not Added",
      address: target.address || "Not Added",
      phone: target.phone || "Not Added",
      mail: target.mail || "Not Added",
    });
  } else {
    console.log("Username or Password incorect");
    res.send({ error: "Username or Password incorect" });
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
// Handle 404 for index
app.get("/*", (req, res) => {
  res.render("404", {
    name: "CABINET",
  });
});

// Run App
app.listen(port, () => {
  console.log("App Running...");
});
