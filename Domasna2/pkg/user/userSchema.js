const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must enter a name"],
   },
   email: {
    type: String,
    required: [true, "You must enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
   },
   role: {
    type: String,
    enum: ["user", "admin"],
   },
   password: {
    type: String, 
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
   },
});

  userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 8);
    next()
  });

  const User = mongoose.model("User", userSchema);

module.exports = User;
