import { Router } from "express";
import { deleteRefreshController, loginController, refreshController, registerController } from "../controllers/auth";
import authMiddleware from "../middlewares/authMiddleware";

const authRouter: Router = Router();

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

authRouter.get("/refresh", authMiddleware, refreshController);

authRouter.delete("/delete_token", authMiddleware, deleteRefreshController);

// router.post("/login-google"); // googleToken in body

// router.patch("/confirm-email"); // email, token in params
// router.post("/forget-password"); // email on body
// router.patch("/reset-password"); // email, new, confirm in params
// router.post("/change-password", authMiddleware); // email, pwd, new, confirm in body

export default authRouter;
