const mongoose = require ("mongoose");
const dotenv = require ("dotenv");

//ja konfigurirame okolinata i vmetnuvame config.env da bide del od objektot  process.env
dotenv.config({path: `${__dirname}/../../config.env`});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
 process.env.DATABASE_PASSWORD  
);

exports.init = async () => {
  try{
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to DATABASE");
  }catch(err){
    console.log(err);
  }
};