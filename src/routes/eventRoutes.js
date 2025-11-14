import express from "express"
import { logMiddleware } from "../middleware/logger.js"
import * as eventController from "../controllers/eventController.js"

const router = express.Router()

router.get("/", logMiddleware, eventController.getAllEvents) // GET /events
router.get("/upcoming", eventController.getUpcomingEvents) // GET /events/upcoming (special route before :id)
router.get("/:id", eventController.getEventById) // GET /events/:id
router.post("/", eventController.createEvent) // POST /events
router.put("/:id", eventController.updateEvent) // PUT /events/:id
router.delete("/:id", eventController.deleteEvent) // DELETE /events/:id

export default router