const mongoose = require('mongoose');

const filmsWatchedSchema = new mongoose.Schema({
  date: Date,
  filmName: String,
  year: Number,
  letterboxdURI: String,
  rating: Number
});

const FilmsWatchedData = mongoose.model('FilmsWatchedData', filmsWatchedSchema);

module.exports = FilmsWatchedData;