import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleware"
import roleMiddleware from "../middlewares/roleMiddleware"
import { Roles } from "../types/types"
import { createBrand, deleteBrand, getBrandById, getBrands, updateBrand } from "../controllers/brand"
import upload from "../utils/multer"

const brandRouter = Router()

brandRouter.get("/", getBrands)
brandRouter.get("/:id", getBrandById)
brandRouter.post("/", authMiddleware, roleMiddleware([Roles.ADMIN, Roles.MANAGER]), upload.single("logo"), createBrand)
brandRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware([Roles.ADMIN, Roles.MANAGER]),
  upload.single("logo"),
  updateBrand,
)
brandRouter.delete("/:id", authMiddleware, roleMiddleware([Roles.ADMIN, Roles.MANAGER]), deleteBrand)

export default brandRouter
