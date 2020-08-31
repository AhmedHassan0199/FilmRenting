const express = require("express");
const films = express.Router();

const filmController = require("../controllers/filmController");

films.post("/addFilm", filmController.addFilm);
films.post("/login", filmController.verifyUser);

module.exports = films;
