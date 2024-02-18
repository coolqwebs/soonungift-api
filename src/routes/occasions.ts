import { Router } from "express"
import authMiddleware from "../middlewares/authMiddleware"
import roleMiddleware from "../middlewares/roleMiddleware"
import { Roles } from "../types/types"

import upload from "../utils/multer"
import { createOccasion, deleteOccasion, getOccasionById, getOccasions, updateOccasion } from "../controllers/occasions"

const occasionRouter = Router()

occasionRouter.get("/", getOccasions)
occasionRouter.get("/:id", getOccasionById)
occasionRouter.post(
  "/",
  authMiddleware,
  roleMiddleware([Roles.ADMIN, Roles.MANAGER]),
  upload.single("image"),
  createOccasion,
)
occasionRouter.put(
  "/:id",
  authMiddleware,
  roleMiddleware([Roles.ADMIN, Roles.MANAGER]),
  upload.single("image"),
  updateOccasion,
)
occasionRouter.delete("/:id", authMiddleware, roleMiddleware([Roles.ADMIN, Roles.MANAGER]), deleteOccasion)

export default occasionRouter
