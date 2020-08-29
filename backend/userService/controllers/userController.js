const jwt = require("../node_modules/jsonwebtoken");
const bcrypt = require("../node_modules/bcrypt/bcrypt");
const {
  ALREADY_EXIST,
  BAD_REQUEST,
  AUTHORIZATION_ERROR,
  GOOD_REQUEST,
} = require("../utils/httpCodes");
const keys = require("../utils/keys");
const User = require("../models/user");

module.exports.registerUser = (req, res) => {
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
          console.log(userData);
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
};
module.exports.login = (req, res) => {
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
};
