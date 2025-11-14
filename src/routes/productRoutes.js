import express from "express"
import { logMiddleware } from "../middleware/logger.js"
import * as productController from "../controllers/productController.js"

const router = express.Router()

router.get("/", logMiddleware, productController.getAllProducts) // GET /products
router.get("/low-stock", productController.getLowStockProducts) // GET /products/low-stock (special route before :id)
router.get("/:id", productController.getProductById) // GET /products/:id
router.post("/", productController.createProduct) // POST /products
router.put("/:id", productController.updateProduct) // PUT /products/:id
router.delete("/:id", productController.deleteProduct) // DELETE /products/:id

export default router