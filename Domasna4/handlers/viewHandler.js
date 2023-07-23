const Oglas = require("../pkg/oglasi/oglasiSchema");

exports.getLoginForm = (req, res) => {
  try{ 
    res.status(200).render("login",
    {
      title: "Login",
    });
  }catch(err){
    res.status(500).send("Error");
  }
}; 

exports.oglasView = async (req, res) => {
  try{
    const oglasi = await Oglas.find();
    req.status(200).render("viewOglasi", {
      status: "success",
      naslov: "OGLAS",
      oglasi,
    });
  }catch(err){
    res.status(500).send(err);
  }
};

exports.createOglas = async (req, res) => {
  try{
    await Oglas.create(req.body);
    res.redirect("/viewOglasi");
  }catch(err){
    res.status(500).send(err);
  }
};