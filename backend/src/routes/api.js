import { Router } from "express";
import { TICKET_NAMESPACE, USER_NAMESPACE } from "../constants/routes/namespaces.js";
import userRouter from "./api/user/user.js";
import ticketRouter from "./api/ticket/ticket.js";

const apiRouter = new Router();

apiRouter.use(USER_NAMESPACE, userRouter);
apiRouter.use(TICKET_NAMESPACE, ticketRouter);

export default apiRouter;