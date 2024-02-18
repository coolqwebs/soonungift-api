import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleware"
import roleMiddleware from "../middlewares/roleMiddleware"
import { Roles } from "../types/types"
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/category"
import upload from "../utils/multer"

const categoryRouter = Router()

categoryRouter.get("/", getCategories)
categoryRouter.get("/:id", getCategoryById)
categoryRouter.post(
  "/",
  authMiddleware,
  roleMiddleware([Roles.ADMIN, Roles.MANAGER]),
  upload.single("image"),

  createCategory,
)
categoryRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware([Roles.ADMIN, Roles.MANAGER]),
  upload.single("image"),

  updateCategory,
)
categoryRouter.delete("/:id", authMiddleware, roleMiddleware([Roles.ADMIN, Roles.MANAGER]), deleteCategory)

export default categoryRouter
