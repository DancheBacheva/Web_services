const express = require("express");
const db = require("./pkg/db/index");
const jwt = require("express-jwt");

const authHandler = require("./handlers/authHandler");
const tvshowHandler = require("./handlers/tvshowHandler");

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
    path: ["/api/v1/signup", "/api/v1/login", "/tvshows"]
  })
);

app.post("/api/v1/signup", authHandler.signup);
app.post("/api/v1/login", authHandler.login);

app.post("/api/tvshows", tvshowHandler.createTvshow);
app.get("/api/tvshows", tvshowHandler.getAllTvshows);
app.get("/api/tvshows/:id", tvshowHandler.getOneTvshow);
app.patch("/api/tvshows/:id", tvshowHandler.updateTvshow);
app.delete("/api/tvshows/:id", tvshowHandler.deleteTvshow);

app.listen(process.env.PORT, (err)=>{
  if(err){
    return console.log("Server can not start");
  };
  console.log(`Server started successfully on port ${process.env.PORT}`);
});


