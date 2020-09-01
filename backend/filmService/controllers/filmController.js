const { ALREADY_EXIST, BAD_REQUEST, AUTHORIZATION_ERROR, GOOD_REQUEST } = require('../utils/httpCodes');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);
const Film = require('../models/film');
const { isFilmExists, createFilm, getAllFilms } = require('../repos/film');

module.exports.addFilm = async (req, res) => {
  const { _id } = req.user;
  try {
    const isFilmFound = await isFilmExists(req.body.filmTitle);
    if (isFilmFound) {
      return res.status(ALREADY_EXIST).json({ error: 'Film already exists' });
    }
    const createdFilm = await createFilm({ ...req.body, createdBy: _id });
    return res.status(GOOD_REQUEST).json({ status: createdFilm.filmTitle + 'Is added' });
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error: 'Something went wrong' });
  }
};
module.exports.getFilms = async (req, res) => {
  try {
    const films = await getAllFilms();
    return res.status(GOOD_REQUEST).json(films);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error: 'Something went wrong' });
  }
};
