import { Router } from 'express';
import { deleteRefreshController, loginController, refreshController, registerController } from '../controllers/auth';

const authRouter: Router = Router();

authRouter.post('/register', registerController);

authRouter.post('/login', loginController);

authRouter.get('/refresh', refreshController);

authRouter.delete('/refresh_token', deleteRefreshController);

// router.post("/login-google"); // googleToken in body

// router.patch("/confirm-email"); // email, token in params
// router.post("/forget-password"); // email on body
// router.patch("/reset-password"); // email, new, confirm in params
// router.post("/change-password"); // email, pwd, new, confirm in body

export default authRouter;
