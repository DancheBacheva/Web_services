const User = require ("../pkg/user/userSchema");
const jwt = require ("jsonwebtoken");
const bcrypt = require ("bcryptjs");

exports.signup = async (req, res) => {
  try{ 
    const newUser = await User.create({
      ime: req.body.ime,
      mejl: req.body.mejl,
      lozinka: req.body.lozinka
    });

    const token = jwt.sign({
      id: newUser._id,
      ime: newUser.ime},
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
        user: newUser,
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

    const user = await User.findOne({ mejl });
    if(!user){
      return res.status(400).send("Ne postoi korisnik so vakov mejl vo databazata")
    }

    const isPasswordValid = bcrypt.compareSync(lozinka, user.lozinka);
    if(!isPasswordValid){
      return res.status(400).send("Vnesovte pogresna lozinka")
    }

    const token = jwt.sign(
      {
        id: user._id, ime: user.ime },
        {
          expiresIn: process.env.JWT_EXPIRES,
        }
    );

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
    });
  }catch(err){
    return res.status(500).send("Internal server error")
  }
};