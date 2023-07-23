const mongoose = require("mongoose");

const oglasiSchema = new mongoose.Schema({
  kategorija: {
    type: String,
    enum: ["avtomobili", "nedviznini", "telefoni", "velosipedi"],
    required: [true, "Mora da se vnese kategorija"]
  },

  vid: {
    type: String,
  },

  opis: {
    type: String,
  },
  
  lokacija: {
    type: String,
  },

  godina: {
    type: Number,
  },

  cena: {
    type: Number,
    required: [true, "Mora da se vnese cena"]
  },  
})

const Oglas = mongoose.model("Oglas", oglasiSchema);
module.exports = Oglas;