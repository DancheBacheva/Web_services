const express = require("express");

const rickandmorty = require("./handlers/rickandmorty");  

const app = express();

app.get("/api/v1/rickandmorty/character/:id", rickandmorty.getData);

app.listen(10002, (err) => {
  if (err) {
    return console.log("Could not start a service");
    }
    console.log("Service started successfully");
});
