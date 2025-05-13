import { Router } from "express";
import { LOGIN, VALIDATE_TOKEN } from "../../../../constants/routes/routes.js";
import login from "../../../../controllers/user/auth/login.js";
import validateToken from "../../../../controllers/user/auth/validateToken.js";

const authRouter = new Router();

authRouter.post(LOGIN, login);
authRouter.get(VALIDATE_TOKEN, validateToken);

export default authRouter;