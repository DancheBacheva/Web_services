//? gi povikuvame paketite
const express = require("express");
const db = require("./pkg/db/index");
const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");

const movies = require("./handlers/movies");
const authHandler = require("./handlers/authHandler");
const viewHandler = require("./handlers/viewHandler");

//? inicijazilirame aplikacija
const app = express();

//? povikuvame middelwari
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//? ovoj paket se grizi za parsiranjeto na cookies
app.use(cookieParser());
app.use(express.static("public"));

//? izvrsuvanje na init funkcijata so koja se konektirame so data baza
db.init();

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
        return null; 
      },
    })
    .unless({
      path: ["/api/v1/signup", "/api/v1/login", "/login"],
    })
);

app.post("/api/v1/signup", authHandler.signup);
app.post("/api/v1/login", authHandler.login);

app.get("/movies", authHandler.middelwareTest, movies.getAll);
app.get("/movies/:id", movies.getOne);
app.post("/movies", movies.create);
app.put("/movies/:id", movies.replace);
app.patch("/movies/:id", movies.uploadFilmsPhotos, movies.update);
app.delete("/movies/:id", movies.delete);

app.get("/me", movies.getByUser);
app.post("/createuser", movies.createByUser);

// view ruti
app.get("/viewMovies", viewHandler.movieView);
app.get("/login", viewHandler.getLoginForm);
app.post("/createMovie", viewHandler.createMovie);
app.get("/deleteMovie/:id", viewHandler.deleteMovie);
app.get("/viewMovies/:id", viewHandler.viewMovieDetails);
app.post("/modifyMovie/:id", viewHandler.modifyMovie);

//? slusame aplikacija
app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Could not start service");
  }
  console.log(`Service started successfully on port ${process.env.PORT}`);
});

//!
//? app.get("/movies/:id", movies.getOne);
//? da se prikazat 3 filma, znaci da se implementira multer so koj kje mozeme da prikacime 3 sliki