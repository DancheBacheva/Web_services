const Telefon = require("../pkg/telefoni/telefoniSchema");

exports.createTelefon = async (req, res) => {
  try{
    const newTelefon = await Telefon.create(req.body);
    res.send(newTelefon);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getAllTelefoni = async (req, res) => {
  try{
  const queryObj = {...req.query};
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,
  (match)=> `$${match}`
  );
  const query = JSON.parse(queryString);
  const telefon = await Telefon.find(query);
  res.send(Telefon);
}catch(err){
  res.status(400).json({
    status: "fail",
    message: err
  });
}
};

exports.updateTelefon = async (req, res) => {
  try{
    const updatedTelefon = await Telefon.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true,
        runValidators: true
      });
      res.send(updatedTelefon);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteTelefon = async (req, res) => {
  try{
    await Telefon.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null
    });
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};