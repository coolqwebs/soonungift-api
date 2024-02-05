import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { getAllUsers, getUserInfo, updateUserInfo } from "../controllers/user";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/aboutMe", authMiddleware, getUserInfo);

userRouter.put("/:id", authMiddleware, updateUserInfo);

export default userRouter;
