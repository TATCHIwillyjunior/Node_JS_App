let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Fiction" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "Fiction" },
  { id: 3, title: "1984", author: "George Orwell", year: 1949, genre: "Dystopian" },
];

export const getAllBooks = (req, res) => {
  res.json({ data: books });
};

export const getBookById = (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
};

export const createBook = (req, res) => {
  const { title, author, year, genre } = req.body;
  if (!title || !author || !year || !genre) {
    return res.status(400).json({ error: "Missing required fields: title, author, year, genre" });
  }
  const newBook = { id: Math.max(...books.map(b => b.id), 0) + 1, title, author, year, genre };
  books.push(newBook);
  res.status(201).json(newBook);
};

export const updateBook = (req, res) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });
  
  const { title, author, year, genre } = req.body;
  books[bookIndex] = { id, title: title || books[bookIndex].title, author: author || books[bookIndex].author, year: year || books[bookIndex].year, genre: genre || books[bookIndex].genre };
  res.json(books[bookIndex]);
};

export const deleteBook = (req, res) => {
  const id = Number(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex === -1) return res.status(404).json({ error: "Book not found" });
  
  const deletedBook = books.splice(bookIndex, 1);
  res.json({ message: "Book deleted", book: deletedBook[0] });
};