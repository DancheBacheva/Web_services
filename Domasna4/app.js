const express = require("express");
const jwt = require("express-jwt");
const db = require("./pkg/db/index");
const cookieParser = require("cookie-parser");

const authHandler = require("./handlers/authHandler");
const viewHandler = require("./handlers/viewHandler");
const oglasiHandler = require("./handlers/oglasiHandler");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static("public"));

db.init();

//so ovoj midlver implementirame protekcija
app.use(
  jwt
    .expressjwt({
      algorithms: ["HS256"],
      secret: process.env.JWT_SECRET,
      getToken: (req) => {
        if (
          req.headers.authorization &&
          req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return req.headers.authorization.split(" ")[1];
        }
        if (req.cookies.jwt) {
          return req.cookies.jwt;
        }
        return null; // vo slucaj ako nemame isprateno token
    },
  })
  .unless({
    path: ["/api/v1/signup", "/api/v1/login", "/api/oglasi", "/login", "/viewOglasi", "/createOglas"]
  })
);

app.post("/api/v1/signup", authHandler.signup);
app.post("/api/v1/login", authHandler.login);

app.get("/oglasi", oglasiHandler.getAllOglasi);
app.post("/oglasi", oglasiHandler.createOglas);
app.get("/oglasi/:id", oglasiHandler.getOneOglas);
app.patch("/oglasi/:id", oglasiHandler.updateOglas);
app.put("/oglasi/:id", oglasiHandler.replaceOglas);
app.delete("/oglasi/:id", oglasiHandler.deleteOglas);

app.get("/mojoglas", oglasiHandler.getByUser);
app.post("/mojnovoglas", oglasiHandler.createByUser);

// view ruti
app.get("/viewOglasi", viewHandler.oglasView);
app.get("/login", viewHandler.getLoginForm);
app.post("/createOglas", viewHandler.createOglas);


app.listen(process.env.PORT, (err)=>{
  if (err){
    return console.log("Server can not start");
  }
  console.log(`Server started successfuly on port ${process.env.PORT}`);
});