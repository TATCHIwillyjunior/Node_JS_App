import express from "express"
import { logMiddleware } from "../middleware/logger.js"
import * as restaurantController from "../controllers/restaurantController.js"

const router = express.Router()

router.get("/", logMiddleware, restaurantController.getAllRestaurants) // GET /restaurants
router.get("/:id", restaurantController.getRestaurantById) // GET /restaurants/:id
router.post("/", restaurantController.createRestaurant) // POST /restaurants
router.put("/:id", restaurantController.updateRestaurant) // PUT /restaurants/:id
router.delete("/:id", restaurantController.deleteRestaurant) // DELETE /restaurants/:id

export default router