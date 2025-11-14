let movies = [
  { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont", year: 1994, rating: 9.3 },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola", year: 1972, rating: 9.2 },
  { id: 3, title: "The Dark Knight", director: "Christopher Nolan", year: 2008, rating: 9.0 },
];

export const getAllMovies = (req, res) => {
  res.json({ data: movies });
};

export const getMovieById = (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id === id);
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  res.json(movie);
};

export const createMovie = (req, res) => {
  const { title, director, year, rating } = req.body;
  if (!title || !director || !year || rating === undefined) {
    return res.status(400).json({ error: "Missing required fields: title, director, year, rating" });
  }
  const newMovie = { id: Math.max(...movies.map(m => m.id), 0) + 1, title, director, year, rating };
  movies.push(newMovie);
  res.status(201).json(newMovie);
};

export const updateMovie = (req, res) => {
  const id = Number(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === id);
  if (movieIndex === -1) return res.status(404).json({ error: "Movie not found" });
  
  const { title, director, year, rating } = req.body;
  movies[movieIndex] = { 
    id, 
    title: title || movies[movieIndex].title, 
    director: director || movies[movieIndex].director, 
    year: year || movies[movieIndex].year, 
    rating: rating !== undefined ? rating : movies[movieIndex].rating 
  };
  res.json(movies[movieIndex]);
};

export const deleteMovie = (req, res) => {
  const id = Number(req.params.id);
  const movieIndex = movies.findIndex((m) => m.id === id);
  if (movieIndex === -1) return res.status(404).json({ error: "Movie not found" });
  
  const deletedMovie = movies.splice(movieIndex, 1);
  res.json({ message: "Movie deleted", movie: deletedMovie[0] });
};