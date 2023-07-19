const mongoose = require ("mongoose");

const telefoniSchema = new mongoose.Schema({
  marka: {
    type: String,
    required: [true, "Mora da se vnese marka"]
  },
  model: {
    type: String,
    required: [true, "Mora da se vnese model"]
  },

  memorija: {
    type: Number,
  },

  boja: {
    type: String
  },

  cena: {
    type: Number,
    required: [true, "Mora da se vnese cena"]
  },  
});

const Telefon = mongoose.model("Telefon", telefoniSchema);
module.exports = Telefon;