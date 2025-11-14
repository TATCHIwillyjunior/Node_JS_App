import Book from '../models/Book.js'

export const getAllBooks = (req, res) => {
  try {
    const books = Book.findAll()
    return res.json({ data: books })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const getBookById = (req, res) => {
  try {
    const id = Number(req.params.id)
    const book = Book.findById(id)
    if (!book) return res.status(404).json({ error: 'Book not found' })
    return res.json(book)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const createBook = (req, res) => {
  try {
    const { title, author, year, genre } = req.body
    if (!title || !author) {
      return res.status(400).json({ error: 'Missing required fields: title and author' })
    }
    const newBook = Book.create({ title, author, year, genre })
    return res.status(201).json(newBook)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const updateBook = (req, res) => {
  try {
    const id = Number(req.params.id)
    const updated = Book.update(id, req.body)
    if (!updated) return res.status(404).json({ error: 'Book not found' })
    return res.json(updated)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const deleteBook = (req, res) => {
  try {
    const id = Number(req.params.id)
    const deleted = Book.delete(id)
    if (!deleted) return res.status(404).json({ error: 'Book not found' })
    return res.json({ message: 'Book deleted', book: deleted })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}