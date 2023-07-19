const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require ("bcryptjs");

const userSchema = new mongoose.Schema({
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
    enum: ["user", "admin"],
    default: "user"
  },
  lozinka: {
    type: String,
    required: [true, "Mora da se vnese lozinka"],
    minlength: [8, "Lozinkata mora da se sotoi od najmalku 8 karakteri"]
  },
});

//so ovaa metoda na predvremen return sprecuvame da se aktivira celosnata funkcija ako uslovot e ispolnet
userSchema.pre("save", async function (next){
  if(!this.isModified("lozinka")) return next();
  this.lozinka = await bcrypt.hash(this.lozinka, 12);
  next()
});

const User = mongoose.model("User", userSchema);
module.exports = User;