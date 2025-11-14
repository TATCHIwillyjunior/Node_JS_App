import db from '../config/database.js'

class Book {
    static tableName = 'books'
    
    static createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                year INTEGER,
                genre TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `
        db.exec(sql)
        console.log(`✅ Table '${this.tableName}' created/verified`)
    }
    
    static findAll() {
        const stmt = db.prepare(`SELECT * FROM ${this.tableName} ORDER BY id DESC`)
        return stmt.all()
    }
    
    static findById(id) {
        const stmt = db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
        return stmt.get(id)
    }
    
    static create(data) {
        const { title, author, year, genre } = data
        const stmt = db.prepare(`
            INSERT INTO ${this.tableName} (title, author, year, genre) 
            VALUES (?, ?, ?, ?)
        `)
        const result = stmt.run(title, author, year || null, genre || null)
        return this.findById(result.lastInsertRowid)
    }
    
    static update(id, data) {
        const { title, author, year, genre } = data
        const updates = []
        const values = []
        
        if (title !== undefined) { updates.push('title = ?'); values.push(title) }
        if (author !== undefined) { updates.push('author = ?'); values.push(author) }
        if (year !== undefined) { updates.push('year = ?'); values.push(year) }
        if (genre !== undefined) { updates.push('genre = ?'); values.push(genre) }
        
        updates.push('updated_at = CURRENT_TIMESTAMP')
        values.push(id)
        
        if (updates.length === 1) return this.findById(id)
        
        const stmt = db.prepare(`UPDATE ${this.tableName} SET ${updates.join(', ')} WHERE id = ?`)
        stmt.run(...values)
        return this.findById(id)
    }
    
    static delete(id) {
        const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`)
        return stmt.run(id).changes > 0
    }
    
    static count() {
        const stmt = db.prepare(`SELECT COUNT(*) as count FROM ${this.tableName}`)
        return stmt.get().count
    }
    
    static seed() {
        const count = this.count()
        if (count === 0) {
            console.log('📝 Seeding books table...')
            const samples = [
                { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, genre: 'Fiction' },
                { title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Fiction' },
                { title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian' }
            ]
            samples.forEach(book => this.create(book))
            console.log(`✅ Seeded ${samples.length} books`)
        }
    }
}

export default Book