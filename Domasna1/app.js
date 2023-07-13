const express = require("express");
const db = require("./pkg/db/index");

const moviesHandler = require("./handlers/moviesHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
db.init();
app.post("/api/movies", moviesHandler.createMovie);
app.get("/api/movies", moviesHandler.getAllMovies);
app.get("/api/movies/:id", moviesHandler.getOneMovie);
app.patch("/api/movies/:id", moviesHandler.updateMovie);
app.delete("/api/movies/:id", moviesHandler.deleteMovie);

console.log(process.env);

app.listen(process.env.PORT, (err)=>{
  if(err){
    return console.log("Server could not connect");
  }
  console.log(`Server connected successfully on port ${process.env.PORT}`);
});