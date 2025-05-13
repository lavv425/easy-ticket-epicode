import { Router } from "express";
import authRouter from "./auth/auth.js";
import { AUTH_NAMESPACE } from "../../../constants/routes/namespaces.js";
import { CREATE_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER } from "../../../constants/routes/routes.js";
import getUser from "../../../controllers/user/getUser.js";
import createUser from "../../../controllers/user/createUser.js";
import updateUser from "../../../controllers/user/updateUser.js";
import deleteUser from "../../../controllers/user/deleteUser.js";
import getUsers from "../../../controllers/user/getUsers.js";

const userRouter = new Router();

userRouter.get(GET_USER, getUser);
userRouter.put(UPDATE_USER, updateUser);
userRouter.delete(DELETE_USER, deleteUser);
userRouter.post(CREATE_USER, createUser);
userRouter.get(GET_USERS, getUsers);

// for /user/auth/* routes
userRouter.use(AUTH_NAMESPACE, authRouter);


export default userRouter;