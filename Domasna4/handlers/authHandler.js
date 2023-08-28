const User = require("../pkg/user/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try{
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // const token = jwt.sign({
    //   id: novKorisnik._id,
    //   ime: novKorisnik.ime},
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: process.env.JWT_EXPIRES
    // });

    // res.cookie("jwt", token, {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    //   ),
    //   secure: false,
    //   httpOnly: true
    // });

    res.status(201).json({
      status: "success",
      // token, 
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
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).send("Mora da se vnese mejl i lozinka");
    }

    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).send("Ne postoi korisnik so vakov mejl vo databazata");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send("INVALIDDD PASSSWORRDDD!");
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
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
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
};