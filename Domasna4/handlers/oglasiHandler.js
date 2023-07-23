const Oglas = require ("../pkg/oglasi/oglasiSchema");

exports.createOglas = async (req, res) => {
  try{
    const novOglas = await Oglas.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        oglas: novOglas,
      }
    })
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getAllOglasi = async (req, res) => {
  try{
    const oglasi = await Oglas.find().populate("avtor");
    res.status(200).json({
      status: "success",
      data: {
        oglasi,
      },
    });
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getOneOglas = async (req, res) => {
  try{
    const oneOglas = await Oglas.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        oneOglas,
      }
    })
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateOglas = async (req, res) => {
  try{
    const updatedOglas = await Oglas.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true,
        runValidators: true,        
      });
      res.status(200).json({
        status: "success",
        data: {
          updatedOglas,
        }
      });
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.replaceOglas = async (req, res) => {
  try{
    const replacedOglas = await Oglas.findOneAndReplace(
      { _id: req.params.id },
      { 
        new: true,
        runValidators: true,  
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        replacedOglas,
      }
    });
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteOglas = async (req, res) => {
  try{
    await Oglas.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.createByKorisnik = async (req, res) => {
  try{
    const korisnikId = req.auth.id;
    const oglasPost = await Oglas.create({
      kategorija: req.body.kategorija,
      vid: req.body.vid,
      opis: req.body.opis,
      lokacija: req.body.lokacija,
      godina: req.body.godina,
      cena: req.body.cena,
      avtor: korisnikId
    });
    res.status(201).json(oglasPost);
  }catch(err){
    res.status(500).json({ error: err });
  }
};

exports.getByKorisnik = async (req, res) => {
  try{
    const korisnikId = req.auth.id;
    const mojOglas = await Oglas.find({avtor: korisnikId})
    res.status(201).json(mojOglas);
  }catch(err){
    res.status(500).json({ error: err });
  }
};