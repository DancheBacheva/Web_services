const mongoose = require("mongoose");

const avtomobilSchema = new mongoose.Schema({
  marka: {
    type: String,
    required: [true, "Mora da se vnese marka"]
  },
  model: {
    type: String,
    required: [true, "Mora da se vnese model"]
  },

  godina: {
    type: Number,
  },

  kilometri: {
    type: Number,
  },

  menuvac: {
    type: String
  },

  boja: {
    type: String
  },

  cena: {
    type: Number,
    required: [true, "Mora da se vnese cena"]
  },  
});

const Avtomobil = mongoose.model("Avtomobil", avtomobilSchema);
module.exports = Avtomobil;