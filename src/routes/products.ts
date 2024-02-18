import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleware"
import roleMiddleware from "../middlewares/roleMiddleware"
import {
  createProduct,
  deleteProductById,
  editProductById,
  getAllProducts,
  getProductById,
  publishProduct,
} from "../controllers/products"
import { Roles } from "../types/types"
import upload from "../utils/multer"

const productsRouter = Router()

productsRouter.get("/", getAllProducts)
productsRouter.get("/:id", getProductById)
productsRouter.post(
  "/",
  authMiddleware,
  roleMiddleware([Roles.ADMIN, Roles.MANAGER]),
  upload.single("image"),
  createProduct,
)
productsRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware([Roles.ADMIN, Roles.MANAGER]),
  upload.single("image"),
  editProductById,
)
productsRouter.patch("/:id", authMiddleware, roleMiddleware([Roles.ADMIN, Roles.MANAGER]), publishProduct)
productsRouter.delete("/:id", authMiddleware, roleMiddleware([Roles.ADMIN, Roles.MANAGER]), deleteProductById)

export default productsRouter
