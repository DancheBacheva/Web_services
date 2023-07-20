const Avtomobil = require("../pkg/avtomobili/avtomobiliSchema");

exports.createAvtomobil = async (req, res) => {
  try{
    const newAvtomobil = await Avtomobil.create(req.body);
    res.send(newAvtomobil);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getAllAvtomobili = async (req, res) => {
  try{
  const queryObj = {...req.query};
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,
  (match)=> `$${match}`
  );
  const query = JSON.parse(queryString);
  const avtomobil = await Avtomobil.find(query);
  res.send(avtomobil);
}catch(err){
  res.status(400).json({
    status: "fail",
    message: err
  });
}
};

exports.getOneAvtomobil = async (req, res) => {
  try{
    const oneAvtomobil = await Avtomobil.findById(req.params.id);
    res.send(oneAvtomobil);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateAvtomobil = async (req, res) => {
  try{
    const updatedAvtomobil = await Avtomobil.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true,
        runValidators: true
      });
      res.send(updatedAvtomobil);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteAvtomobil = async (req, res) => {
  try{
    await Avtomobil.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null
    });
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    })
  }
}