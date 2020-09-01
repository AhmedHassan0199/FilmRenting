const express = require("express");
const router = express.Router();
const filmController = require("../controllers/filmController");
const { isAuthenticated } = require("../utils/passport");

router.post("/addFilm", isAuthenticated, filmController.addFilm);
router.post("/filmList", isAuthenticated, filmController.getFilms);

module.exports = router;
