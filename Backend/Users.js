const express = require("./node_modules/express");
const users = express.Router();
const jwt = require("./node_modules/jsonwebtoken");
const bcrypt = require("./node_modules/bcrypt/bcrypt");
const {
  ALREADY_EXIST,
  BAD_REQUEST,
  AUTHORIZATION_ERROR,
  GOOD_REQUEST,
} = require("./utils/httpCodes");
const keys = require("./utils/keys");
const User = require("./models/user");

users.post("/register", (req, res) => {
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
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
              res
                .status(GOOD_REQUEST)
                .json({ status: user.username + " registered" });
            })
            .catch((err) => {
              res.status(BAD_REQUEST).json({ error: "Something Went Wrong" });
            });
        });
      } else {
        res.status(ALREADY_EXIST).json({ error: "User already exists" });
      }
    })
    .catch((err) => {
      res.status(BAD_REQUEST).json({ error: "Something Went Wrong" });
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
          let token = jwt.sign(Data, keys.jwtSecretKey, {
            expiresIn: keys.jwtExpiresIn,
          });
          res.status(GOOD_REQUEST).json(token);
        } else {
          res.status(AUTHORIZATION_ERROR).json({ error: "Wrong Password" });
        }
      } else {
        res
          .status(AUTHORIZATION_ERROR)
          .json({ error: "Wrong username or password" });
      }
    })
    .catch((err) => {
      res.status(BAD_REQUEST).json({ error: "Something Went Wrong" });
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
        res.status(AUTHORIZATION_ERROR).json({ error: "User doesnt exist" });
      }
    })
    .catch((err) => {
      res.status(BAD_REQUEST).json({ error: "Something Went Wrong" });
    });
});

module.exports = users;
