const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const korisnikSchema = new mongoose.Schema({
  ime: {
    type: String,
    required: [true, "Mora da se vnese ime"]
  },
  mejl: {
    type: String,
    required: [true, "Mora da se vnese mejl"],
    unique: true,
    validate: [validator.isEmail, "Mora da se vnese tocen mejl"]
  },
  role: {
    type: String,
    enum: ["korisnik", "admin"],
    default: "korisnik"
  },
  lozinka: {
    type: String,
    required: [true, "Mora da se vnese lozinka"],
    minlength: [8, "Lozinkata mora da se sotoi od najmalku 8 karakteri"]
  },
});

korisnikSchema.pre("save", async function (next){
  if(!this.isModified("lozinka")) return next();
  this.lozinka = await bcrypt.hash(this.lozinka, 12);
  next()
});

const Korisnik = mongoose.model("Korisnik", korisnikSchema);
module.exports = Korisnik;