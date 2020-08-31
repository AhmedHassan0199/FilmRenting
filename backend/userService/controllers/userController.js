const jwt = require("../node_modules/jsonwebtoken");
const bcrypt = require("../node_modules/bcrypt/bcrypt");
const {
  ALREADY_EXIST,
  BAD_REQUEST,
  AUTHORIZATION_ERROR,
  GOOD_REQUEST,
} = require("../utils/httpCodes");
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const joiAssert = require("joi-assert");
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
  const Validations = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required().min(8),
    phoneNumber: joi.number().required().min(8).max(15),
  });
  const valid = Validations.validate(userData);
  if (valid) {
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
  } else {
    res.status(BAD_REQUEST).json({ error: "Something Went Wrong" });
  }
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
            id: user._id,
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
