const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const { isAuthenticated } = require('../utils/auth');
const { validateCreateFilm } = require('../validation/film');

router.post('/addFilm', isAuthenticated, validateCreateFilm, filmController.addFilm);
router.post('/filmList', isAuthenticated, filmController.getFilms);

module.exports = router;
