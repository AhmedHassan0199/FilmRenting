const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./Models/User");

users.post("/register", (req, res) => {
  const userData = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    phone_Number: req.body.phoneNumber,
  };

  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.status(200).json({ status: user.username + " registered" });
            })
            .catch((err) => {
              res.status(401).json({ error: "Something Went Wrong" });
            });
        });
      } else {
        res.status(401).json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.status(401).json({ error: "Something Went Wrong" });
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      console.log("USER :" + user);
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const Data = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
          };
          let token = jwt.sign(Data, process.env.SECRET_KEY, {
            expiresIn: 1500,
          });
          res.status(200).json(token);
        } else {
          res.status(306).json({ error: "Wrong Password" });
        }
      } else {
        res.status(306).json({ error: "Wrong username or password" });
      }
    })
    .catch((err) => {
      res.status(306).json({ error: "Something Went Wrong" });
    });
});

users.post("/profile", (req, res) => {
  var Decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    _id: Decoded._id,
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(401).json({ error: "User doesnt exist" });
      }
    })
    .catch((err) => {
      res.status(401).json({ error: "Something Went Wrong" });
    });
});

module.exports = users;
