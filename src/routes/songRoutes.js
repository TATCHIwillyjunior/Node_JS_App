import express from "express"
import { logMiddleware } from "../middleware/logger.js"
import * as songController from "../controllers/songController.js"

const router = express.Router()

router.get("/", logMiddleware, songController.getAllSongs) // GET /songs
router.get("/:id", songController.getSongById) // GET /songs/:id
router.post("/", songController.createSong) // POST /songs
router.put("/:id", songController.updateSong) // PUT /songs/:id
router.delete("/:id", songController.deleteSong) // DELETE /songs/:id

export default router