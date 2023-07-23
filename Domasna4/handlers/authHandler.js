const Korisnik = require ("../pkg/korisnik/korisnikSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try{
    const novKorisnik = await Korisnik.create({
      ime: req.body.ime,
      mejl: req.body.mejl,
      lozinka: req.body.lozinka
    });

    const token = jwt.sign({
      id: novKorisnik._id,
      ime: novKorisnik.ime},
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES
    });

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true
    });

    res.status(201).json({
      status: "success",
      token, 
      data: {
        korisnik: novKorisnik,
      },
    });

  }catch(err){
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try{
    const { mejl, lozinka } = req.body;
    if(!mejl || !lozinka){
      return res.status(400).send("Mora da se vnese mejl i lozinka");
    }

    const korisnik = await Korisnik.findOne({ mejl });
    if(!korisnik){
      return res.status(400).send("Ne postoi korisnik so vakov mejl vo databazata");
    }

    const isLozinkaValid = bcrypt.compareSync(lozinka, korisnik.lozinka);
    if(!isLozinkaValid){
      return res.status(400).send("Vnesovte pogresna lozinka");
    }

    const token = jwt.sign(
      {
        id: korisnik._id, ime: korisnik.ime },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES,
        }
    );

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(201).json({
      status: "success",
      token,
    });
  }catch(err){
    res.status(500).send("Internal server error");
  }
};

