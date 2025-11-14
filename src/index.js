import express from "express"
import config from "./config/config.js"  // Import config
import { logMiddleware } from "./middleware/logger.js"
import { validateApiKey, validateApiKeyProduction } from "./middleware/apiKey.js"  // Import API key middleware
import userRoutes from "./routes/userRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"
import songRoutes from "./routes/songRoutes.js"
import videoGameRoutes from "./routes/videoGameRoutes.js"
import carRoutes from "./routes/carRoutes.js"
import restaurantRoutes from "./routes/restaurantRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import recipeRoutes from "./routes/recipeRoutes.js"
import { initializeDatabase } from "./config/database.js"

const app = express()

// Initialize database before starting server
await initializeDatabase()

// Global middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logMiddleware)

// Public routes (no API key needed)
app.get('/', (req, res) => {
	res.json({ 
		message: "Welcome to the API",
		version: "1.0.0",
		environment: config.nodeEnv,
		endpoints: {
			users: "/users",
            books: "/books",
            movies: "/movies",
            songs: "/songs",
            videoGames: "/videogames",
            cars: "/cars",
            restaurants: "/restaurants",
			products: "/products",
            events: "/events",
            recipes: "/recipes"

		}
	})
})

// Health check (useful for Render)
app.get('/health', (req, res) => {
	res.json({ 
		status: 'OK',
		timestamp: new Date().toISOString(),
		environment: config.nodeEnv
	})
})

// Protected routes (API key required)
// Option 1: Protect all /users routes
app.use('/users', validateApiKey, userRoutes)

app.use('/books', bookRoutes)
app.use('/movies', movieRoutes)
app.use('/songs', songRoutes)
app.use('/videogames', videoGameRoutes)
app.use('/cars', carRoutes)
app.use('/restaurants', restaurantRoutes)
app.use('/products', productRoutes)
app.use('/events', eventRoutes)
app.use('/recipes', recipeRoutes)

// Option 2: Only protect in production (easier for development)
// app.use('/users', validateApiKeyProduction, userRoutes)

// 404 handler
app.use((req, res) => {
	res.status(404).json({ 
		error: 'Not Found',
		message: `Route ${req.method} ${req.path} not found` 
	})
})

// Error handler
app.use((err, req, res, next) => {
	console.error('Error:', err)
	res.status(err.status || 500).json({
		error: err.message || 'Internal Server Error',
		...(config.isDevelopment() && { stack: err.stack })
	})
})

// Start server
app.listen(config.port, () => {
	console.log(`✅ Server running on http://localhost:${config.port}`)
	console.log(`📊 Environment: ${config.nodeEnv}`)
	console.log(`🔒 API Key protection: ${config.apiKey ? 'ENABLED' : 'DISABLED'}`)
	console.log(`\nAPI Endpoints:`)
	console.log(`  GET    /              - Welcome message (public)`)
	console.log(`  GET    /health        - Health check (public)`)
	console.log(`  GET    /users         - Get all users (protected)`)
	console.log(`  GET    /users/:id     - Get user by ID (protected)`)
	console.log(`  POST   /users         - Create new user (protected)`)
	console.log(`  PUT    /users/:id     - Update user (protected)`)
	console.log(`  DELETE /users/:id     - Delete user (protected)`)
	// Book routes
	console.log(`  GET    /books         - Get all books`)
    console.log(`  GET    /books/:id     - Get book by ID`)
    console.log(`  POST   /books         - Create book`)
    console.log(`  PUT    /books/:id     - Update book`)
    console.log(`  DELETE /books/:id     - Delete book`)
	// Movie routes
	console.log(`  GET    /movies        - Get all movies`)
    console.log(`  GET    /movies/:id    - Get movie by ID`)
    console.log(`  POST   /movies        - Create movie`)
    console.log(`  PUT    /movies/:id    - Update movie`)
    console.log(`  DELETE /movies/:id    - Delete movie`)
	// Songs routes
    console.log(`  GET    /songs         - Get all songs`)
    console.log(`  GET    /songs/:id     - Get song by ID`)
    console.log(`  POST   /songs         - Create song`)
    console.log(`  PUT    /songs/:id     - Update song`)
    console.log(`  DELETE /songs/:id     - Delete song`)
	// Video Games routes
    console.log(`  GET    /videogames    - Get all video games`)
    console.log(`  GET    /videogames/:id - Get video game by ID`)
    console.log(`  POST   /videogames    - Create video game`)
    console.log(`  PUT    /videogames/:id - Update video game`)
    console.log(`  DELETE /videogames/:id - Delete video game`)
	// Cars routes
    console.log(`  GET    /cars          - Get all cars`)
    console.log(`  GET    /cars/:id      - Get car by ID`)
    console.log(`  POST   /cars          - Create car`)
    console.log(`  PUT    /cars/:id      - Update car`)
    console.log(`  DELETE /cars/:id      - Delete car`)
	// Restaurants routes
    console.log(`  GET    /restaurants   - Get all restaurants`)
    console.log(`  GET    /restaurants/:id - Get restaurant by ID`)
    console.log(`  POST   /restaurants   - Create restaurant`)
    console.log(`  PUT    /restaurants/:id - Update restaurant`)
    console.log(`  DELETE /restaurants/:id - Delete restaurant`)
	// Products routes
	console.log(`  GET    /products      - Get all products`)
    console.log(`  GET    /products/low-stock - Get low stock products`)
    console.log(`  GET    /products/:id  - Get product by ID`)
    console.log(`  POST   /products      - Create product`)
    console.log(`  PUT    /products/:id  - Update product`)
    console.log(`  DELETE /products/:id  - Delete product`)
	// Events routes
    console.log(`  GET    /events        - Get all events`)
    console.log(`  GET    /events/upcoming - Get upcoming events`)
    console.log(`  GET    /events/:id    - Get event by ID`)
    console.log(`  POST   /events        - Create event`)
    console.log(`  PUT    /events/:id    - Update event`)
    console.log(`  DELETE /events/:id    - Delete event`)
	// Recipes routes
    console.log(`  GET    /recipes       - Get all recipes`)
    console.log(`  GET    /recipes/by-difficulty?difficulty=Easy - Filter by difficulty`)
    console.log(`  GET    /recipes/by-cuisine?cuisine=Italian - Filter by cuisine`)
    console.log(`  GET    /recipes/:id   - Get recipe by ID`)
    console.log(`  POST   /recipes       - Create recipe`)
    console.log(`  PUT    /recipes/:id   - Update recipe`)
    console.log(`  DELETE /recipes/:id   - Delete recipe`)
})

export default app
// Export app for testing purposes