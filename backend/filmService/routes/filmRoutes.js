const express = require("express");
const router = express.Router();
const filmController = require("../controllers/filmController");
const { isAuthenticated } = require("../utils/auth");
const { validateCreateFilm } = require("../validation/film");

router.post(
  "/addFilm",
  isAuthenticated,
  validateCreateFilm,
  filmController.addFilm
);
router.get("/filmList", isAuthenticated, filmController.getFilms);

router.post("/rentFilm", isAuthenticated, filmController.rentFilm);

module.exports = router;
