const Movie = require("../pkg/movies/moviesSchema");

exports.createMovie = async (req, res) =>{
  try{
    const newMovie = await Movie.create(req.body);
    res.send(newMovie);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllMovies = async (req, res) => {
  try{
    const queryObj = {...req.query};
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const query = JSON.parse(queryString);
    const movies = await Movie.find(query);
    res.send(movies);
  }catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getOneMovie = async (req, res) => {
  try{
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try{
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body,
    {
      new: true,
      runValidators: true,
    });
    res.send(updatedMovie);
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try{
    await Movie.findByIdAndDelete(req.params.id);
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