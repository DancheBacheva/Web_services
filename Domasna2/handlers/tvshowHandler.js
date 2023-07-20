const tvShow = require("../pkg/tvshows/tvshowSchema");

exports.createTvshow = async (req, res) => {
  try{
  const newTvshow = await tvShow.create(req.body);
  res.send(newTvshow);
  }catch(err){
  res.status(400).json({
    status: "fail",
    message: err,
  });
}
};

exports.getAllTvshows = async (req, res) => {
  try{
    const queryObj = {...req.query};
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const query = JSON.parse(queryString);
    const tvShow = await tvShow.find(query);
    res.send(tvShow);
  }catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getOneTvshow = async (req, res) => {
  try{
    const oneTvshow = await tvShow.findById(req.params.id);
    res.send(oneTvshow);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateTvshow = async (req, res) => {
  try{
    const updatedTvshow = await tvShow.findByIdAndUpdate(req.params.id, req.body,
    {
      new: true,
      runValidators: true,
    });
    res.send(updatedTvshow);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTvshow = async (req, res) => {
  try{
    await tvShow.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};