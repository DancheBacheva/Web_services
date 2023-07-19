const mongoose = require ("mongoose");

const nedvizniniSchema = new mongoose.Schema({
  vid: {
    type: String,
    required: [true, "Mora da se vnese sto se prodava/izdava"]
  },

  kvadratura: {
    type: Number,
  },

  lokacija: {
    type: String,
  },

  cena: {
    type: Number,
    required: [true, "Mora da se vnese cena"]
  },
});

const Nedviznini = mongoose.model("Nedviznini", nedvizniniSchema);
module.exports = Nedviznini;