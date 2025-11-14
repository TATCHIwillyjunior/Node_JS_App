let songs = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", duration: 354 },
  { id: 2, title: "Imagine", artist: "John Lennon", album: "Imagine", duration: 183 },
  { id: 3, title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", duration: 482 },
];

export const getAllSongs = (req, res) => {
  res.json({ data: songs });
};

export const getSongById = (req, res) => {
  const id = Number(req.params.id);
  const song = songs.find((s) => s.id === id);
  if (!song) return res.status(404).json({ error: "Song not found" });
  res.json(song);
};

export const createSong = (req, res) => {
  const { title, artist, album, duration } = req.body;
  if (!title || !artist || !album || duration === undefined) {
    return res.status(400).json({ error: "Missing required fields: title, artist, album, duration" });
  }
  const newSong = { id: Math.max(...songs.map(s => s.id), 0) + 1, title, artist, album, duration };
  songs.push(newSong);
  res.status(201).json(newSong);
};

export const updateSong = (req, res) => {
  const id = Number(req.params.id);
  const songIndex = songs.findIndex((s) => s.id === id);
  if (songIndex === -1) return res.status(404).json({ error: "Song not found" });
  
  const { title, artist, album, duration } = req.body;
  songs[songIndex] = { 
    id, 
    title: title || songs[songIndex].title, 
    artist: artist || songs[songIndex].artist, 
    album: album || songs[songIndex].album, 
    duration: duration !== undefined ? duration : songs[songIndex].duration 
  };
  res.json(songs[songIndex]);
};

export const deleteSong = (req, res) => {
  const id = Number(req.params.id);
  const songIndex = songs.findIndex((s) => s.id === id);
  if (songIndex === -1) return res.status(404).json({ error: "Song not found" });
  
  const deletedSong = songs.splice(songIndex, 1);
  res.json({ message: "Song deleted", song: deletedSong[0] });
};