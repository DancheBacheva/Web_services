const express = require ("express");
const jwt = require ("express-jwt");
const db = require("./pkg/db/index")

const avtomobiliHandler = require("./handlers/avtomobiliHandler");
const velosipediHandler = require("./handlers/velosipediHandler");
const nedvizniniHandler = require("./handlers/nedvizniniHandler");
const telefoniHandler = require("./handlers/telefoniHandler");
const authHandler = require ("./handlers/authHandler");

const app = express();
db.init();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
  jwt.expressjwt({
    algorithms: ["HS256"],
    secret: process.env.JWT_SECRET,
  })
  .unless({
    path: ["/oglas/v1/signup", "/oglas/v1/login", "/oglas/avtomobili"]
  })
)

app.post("/oglas/v1/signup", authHandler.signup);
app.post("/oglas/v1/login", authHandler.login);

app.post("/oglas/avtomobili", avtomobiliHandler.createAvtomobil);
app.get("/oglas/avtomobili", avtomobiliHandler.getAllAvtomobili);
app.patch("/oglas/avtomobili/:id", avtomobiliHandler.updateAvtomobil);
app.delete("/oglas/avtomobili/:id", avtomobiliHandler.deleteAvtomobil);

app.post("/oglas/velosipedi", velosipediHandler.createVelosiped);
app.get("/oglas/velosipedi", velosipediHandler.getAllVelosipedi);
app.patch("/oglas/velosipedi/:id", velosipediHandler.updateVelosiped);
app.delete("/oglas/velosipedi/:id", velosipediHandler.deleteVelosiped);

app.post("oglas/nedviznini", nedvizniniHandler.createNedviznini);
app.get("oglas/nedviznini", nedvizniniHandler.getAllNedviznini);
app.patch("oglas/nedviznini/:id", nedvizniniHandler.updateNedviznini);
app.delete("oglas/nedviznini/:id", nedvizniniHandler.deleteNedviznini);

app.post("oglas/telefoni", telefoniHandler.createTelefon);
app.get("oglas/telefoni", telefoniHandler.getAllTelefoni);
app.patch("oglas/telefoni/:id", telefoniHandler.updateTelefon);
app.delete("oglas/telefoni/:id", telefoniHandler.deleteTelefon);



app.listen(process.env.PORT, (err)=>{
  if (err){
    return console.log("Server can not start");
  }
  console.log(`Server started successfuly on port ${process.env.PORT}`);
});