const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Mora da se vnese ime"]
  },
  email: {
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
  password: {
    type: String,
    required: [true, "Mora da se vnese lozinka"],
    minlength: [8, "Lozinkata mora da se sotoi od najmalku 8 karakteri"]
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
