const Film = require('../models/film');

exports.isFilmExists = async (filmTitle) => {
  const film = await Film.findOne({ filmTitle });
  return film;
};

exports.createFilm = async (film) => {
  const createdFilm = await Film.create(film);
  return createdFilm;
};

exports.getAllFilms = async () => {
  const films = await Film.find();
  return films;
};
