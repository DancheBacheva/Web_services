const mongoose = require ("mongoose");

const tvshowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "You must enter title"]
  },
  year: {
    type: Number,
  },
  rating: {
    type: Number,
  }
});

const tvShow = mongoose.model("TvShow", tvshowSchema);
module.exports = tvShow;