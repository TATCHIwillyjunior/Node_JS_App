import express from "express"
import { logMiddleware } from "../middleware/logger.js"
import * as recipeController from "../controllers/recipeController.js"

const router = express.Router()

router.get("/", logMiddleware, recipeController.getAllRecipes) // GET /recipes
router.get("/by-difficulty", recipeController.getRecipesByDifficulty) // GET /recipes/by-difficulty?difficulty=Easy
router.get("/by-cuisine", recipeController.getRecipesByCuisine) // GET /recipes/by-cuisine?cuisine=Italian
router.get("/:id", recipeController.getRecipeById) // GET /recipes/:id
router.post("/", recipeController.createRecipe) // POST /recipes
router.put("/:id", recipeController.updateRecipe) // PUT /recipes/:id
router.delete("/:id", recipeController.deleteRecipe) // DELETE /recipes/:id

export default router