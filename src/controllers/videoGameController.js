let videoGames = [
  { id: 1, title: "The Legend of Zelda: Breath of the Wild", genre: "Adventure", platform: "Nintendo Switch", releaseYear: 2017, rating: 9.3, price: 59.99 },
  { id: 2, title: "Elden Ring", genre: "Action RPG", platform: "PC/PS5/Xbox", releaseYear: 2022, rating: 9.1, price: 59.99 },
  { id: 3, title: "Cyberpunk 2077", genre: "Action RPG", platform: "PC/PS5/Xbox", releaseYear: 2020, rating: 8.0, price: 49.99 },
];

export const getAllVideoGames = (req, res) => {
  res.json({ data: videoGames });
};

export const getVideoGameById = (req, res) => {
  const id = Number(req.params.id);
  const game = videoGames.find((g) => g.id === id);
  if (!game) return res.status(404).json({ error: "Video game not found" });
  res.json(game);
};

export const createVideoGame = (req, res) => {
  const { title, genre, platform, releaseYear, rating, price } = req.body;
  if (!title || !genre || !platform || !releaseYear || rating === undefined || price === undefined) {
    return res.status(400).json({ error: "Missing required fields: title, genre, platform, releaseYear, rating, price" });
  }
  const newGame = { id: Math.max(...videoGames.map(g => g.id), 0) + 1, title, genre, platform, releaseYear, rating, price };
  videoGames.push(newGame);
  res.status(201).json(newGame);
};

export const updateVideoGame = (req, res) => {
  const id = Number(req.params.id);
  const gameIndex = videoGames.findIndex((g) => g.id === id);
  if (gameIndex === -1) return res.status(404).json({ error: "Video game not found" });
  
  const { title, genre, platform, releaseYear, rating, price } = req.body;
  videoGames[gameIndex] = { 
    id, 
    title: title || videoGames[gameIndex].title, 
    genre: genre || videoGames[gameIndex].genre, 
    platform: platform || videoGames[gameIndex].platform, 
    releaseYear: releaseYear || videoGames[gameIndex].releaseYear, 
    rating: rating !== undefined ? rating : videoGames[gameIndex].rating,
    price: price !== undefined ? price : videoGames[gameIndex].price
  };
  res.json(videoGames[gameIndex]);
};

export const deleteVideoGame = (req, res) => {
  const id = Number(req.params.id);
  const gameIndex = videoGames.findIndex((g) => g.id === id);
  if (gameIndex === -1) return res.status(404).json({ error: "Video game not found" });
  
  const deletedGame = videoGames.splice(gameIndex, 1);
  res.json({ message: "Video game deleted", game: deletedGame[0] });
};