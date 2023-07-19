const mongoose = require ("mongoose");

const velosipedSchema = new mongoose.Schema({
  marka: {
    type: String,
    required: [true, "Vnesi marka"]
  },

  godina: {
    type: Number,
  },

  lokacija: {
    type: String
  },
   cena: {
    type: Number,
    required: [true, "Vnesi cena"]
   }
});

const Velosiped = mongoose.model("Velosiped", velosipedSchema);
module.exports = Velosiped;