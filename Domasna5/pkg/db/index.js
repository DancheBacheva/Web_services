const mongoose = require("mongoose");
const dotenv = require("dotenv");
//? So dotenv ja konfigurirame okolinata i vmetnuvame config.env da e del od process.env objektot
dotenv.config({ path: `${__dirname}/../../config.env` });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//? Kreiravme funkcija koja kje ja eksportirame i kje ja povikame vo app.js
exports.init = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to DATABASE");
  } catch (err) {
    console.log(err);
  }
};
