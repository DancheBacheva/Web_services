const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  naslov: {
    type: String,
    required: [true, "Vnesi naslov"]
  },
  godina: {
    type: Number,
  },

  reziser: {
    type: String,
  },

  imbdRating: {
    type: Number,
  },

  metascore: {
    type: Number,
  }
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
