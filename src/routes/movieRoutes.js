import express from "express"
import { logMiddleware } from "../middleware/logger.js"
import * as movieController from "../controllers/movieController.js"

const router = express.Router()

router.get("/", logMiddleware, movieController.getAllMovies) // GET /movies
router.get("/:id", movieController.getMovieById) // GET /movies/:id
router.post("/", movieController.createMovie) // POST /movies
router.put("/:id", movieController.updateMovie) // PUT /movies/:id
router.delete("/:id", movieController.deleteMovie) // DELETE /movies/:id

export default router