const Velosiped = require("../pkg/velosipedi/velosipediSchema");

exports.createVelosiped = async (req, res) => {
  try{
    const newVelosiped = await Velosiped.create(req.body);
    res.send(newVelosiped);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getAllVelosipedi = async (req, res) => {
  try{
  const queryObj = {...req.query};
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,
  (match)=> `$${match}`
  );
  const query = JSON.parse(queryString);
  const velosiped = await Velosiped.find(query);
  res.send(velosiped);
}catch(err){
  res.status(400).json({
    status: "fail",
    message: err
  });
}
};

exports.getOneVelosiped = async (req, res) => {
  try{
    const oneVelosiped = await Velosiped.findById(req.params.id);
    res.send(oneVelosiped);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateVelosiped = async (req, res) => {
  try{
    const updatedVelosiped = await Velosiped.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true,
        runValidators: true
      });
      res.send(updatedVelosiped);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteVelosiped = async (req, res) => {
  try{
    await Velosiped.findByIdAndDelete(req.params.id);
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