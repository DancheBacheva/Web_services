const Movie = require("../pkg/movies/moviesShmea");

exports.getLoginForm = (req, res) => {
  try {
    res.status(200).render("login", {
      title: "Login",
      podnaslov: "Login in to see HBO moves",
    });
  } catch (err) {
    res.status(500).send("Error");
  }
};

exports.movieView = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).render("viewFilms", {
      status: "success",
      naslov: "HBO",
      movies,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createMovie = async (req, res) => {
  try {
    await Movie.create(req.body);
    res.redirect("/viewMovies");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    console.log(req.params.id);
    const movieId = req.params.id;
    await Movie.findByIdAndDelete(movieId);
    res.redirect("/viewMovies");
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.viewMovieDetails = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    console.log(movie);
    if (!movie) {
      res.status(404).send("Movie not found.");
    } else {
      res.status(200).render("movieDetails", {
        status: "success",
        movie,
      });
    }
  } catch (err) {
    res.status(500).send("Error with thjisd page");
  }
};

exports.modifyMovie = async (req, res) => {
  try {
    // single slika
    if(req.file) {
      const filename = req.file.filename;
      req.body.slika = filename;
      // req.body.slika = req.file.filename;
    }

     // povekje sliki
     if (req.files && req.files.sliki) {
      const filenames = req.files.sliki.map((file) => file.filename);
      req.body.sliki = filenames;
    }
    
    await Movie.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/viewMovies/" + req.params.id);
  } catch (err) {
    res.status(500).send("Error with this page");
  }
};
