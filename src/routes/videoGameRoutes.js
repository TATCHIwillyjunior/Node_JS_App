import express from "express"
import { logMiddleware } from "../middleware/logger.js"
import * as videoGameController from "../controllers/videoGameController.js"

const router = express.Router()

router.get("/", logMiddleware, videoGameController.getAllVideoGames) // GET /videogames
router.get("/:id", videoGameController.getVideoGameById) // GET /videogames/:id
router.post("/", videoGameController.createVideoGame) // POST /videogames
router.put("/:id", videoGameController.updateVideoGame) // PUT /videogames/:id
router.delete("/:id", videoGameController.deleteVideoGame) // DELETE /videogames/:id

export default router