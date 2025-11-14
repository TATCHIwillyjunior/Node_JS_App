import Book from '../models/Book.js'

export const getAllBooks = () => {
    return Book.findAll()
}

export const getBookById = (id) => {
    return Book.findById(id)
}

export const createBook = (bookData) => {
    const { title, author, year, genre } = bookData
    
    if (!title || !author) {
        throw new Error('Title and author are required')
    }
    
    return Book.create({ title, author, year, genre })
}

export const updateBook = (id, bookData) => {
    const existingBook = Book.findById(id)
    if (!existingBook) {
        return null
    }
    
    return Book.update(id, bookData)
}

export const deleteBook = (id) => {
    return Book.delete(id)
}

export const getBookCount = () => {
    return Book.count()
}