import { Router } from "express"
import authRouter from "./auth"
import userRouter from "./user"
import productsRouter from "./products"
import categoryRouter from "./category"
import brandRouter from "./brand"
import occasionRouter from "./occasions"

const router = Router()

router.use("/auth", authRouter)
router.use("/users", userRouter)
router.use("/products", productsRouter)
router.use("/categories", categoryRouter)
router.use("/brands", brandRouter)
router.use("/occasions", occasionRouter)

export default router
