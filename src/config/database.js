import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import config from './config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Use DATABASE_URL from config
let dbPath

if (path.isAbsolute(config.databaseUrl)) {
    // Absolute path (production with volume mount)
    dbPath = config.databaseUrl
} else {
    // Relative path (development)
    dbPath = path.join(__dirname, '../../', config.databaseUrl)
}

console.log(`📊 Database path: ${dbPath}`)

// Create/connect to database
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Initialize database tables
export const initializeDatabase = async () => {
    console.log('🔧 Initializing database...')
    
    // Import all models
    const User = (await import('../models/User.js')).default
    const Book = (await import('../models/Book.js')).default
   
    
    // Create all tables
    User.createTable()
    Book.createTable()
    
    // Seed data in development
    if (config.isDevelopment()) {
        console.log('📝 Seeding development data...')
        User.seed()
        Book.seed()
    }
    
    console.log('✅ Database initialization complete')
}

export default db