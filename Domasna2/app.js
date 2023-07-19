const express = require("express");
const db = require("./pkg/db/index");
const jwt = require("express-jwt");

const authHandler = require("./handlers/authHandler");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.init();

app.use(
  jwt
  .expressjwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
  })
  .unless({
    path: ["/api/v1/signup", "/api/v1/login"]
  })
);

app.post("/api/v1/signup", authHandler.signup);
app.post("/api/v1/login", authHandler.login);

app.listen(process.env.PORT, (err)=>{
  if(err){
    return console.log("Server can not start");
  };
  console.log(`Server started successfully on port ${process.env.PORT}`);
});


