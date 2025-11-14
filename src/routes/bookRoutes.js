import express from "express"
import { logMiddleware } from "../middleware/logger.js"
import * as bookController from "../controllers/bookController.js"

const router = express.Router()

router.get("/", logMiddleware, bookController.getAllBooks) // GET /books
router.get("/:id", bookController.getBookById) // GET /books/:id
router.post("/", bookController.createBook) // POST /books
router.put("/:id", bookController.updateBook) // PUT /books/:id
router.delete("/:id", bookController.deleteBook) // DELETE /books/:id

export default router