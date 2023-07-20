const Nedviznini = require("../pkg/nedviznini/nedvizniniSchema");

exports.createNedviznini = async (req, res) => {
  try{
    const newNedviznini = await Nedviznini.create(req.body);
    res.send(newNedviznini);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getAllNedviznini = async (req, res) => {
  try{
  const queryObj = {...req.query};
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,
  (match)=> `$${match}`
  );
  const query = JSON.parse(queryString);
  const nedviznini = await Nedviznini.find(query);
  res.send(nedviznini);
}catch(err){
  res.status(400).json({
    status: "fail",
    message: err
  });
}
};

exports.getOneNedviznina = async (req, res) => {
  try{
    const oneNedviznina = await Nedviznini.findById(req.params.id);
    res.send(oneNedviznina);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateNedviznini = async (req, res) => {
  try{
    const updatedNedviznini = await Nedviznini.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true,
        runValidators: true
      });
      res.send(updatedNedviznini);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteNedviznini = async (req, res) => {
  try{
    await Nedviznini.findByIdAndDelete(req.params.id);
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