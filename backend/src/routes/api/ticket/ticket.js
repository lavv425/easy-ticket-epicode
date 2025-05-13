import { Router } from "express";
import { CREATE_TICKET, DELETE_TICKET, GET_TICKET, GET_TICKETS, UPDATE_TICKET } from "../../../constants/routes/routes.js";
import getTickets from "../../../controllers/ticket/getTickets.js";

const ticketRouter = new Router();

// ticketRouter.get(GET_TICKET);
// ticketRouter.put(UPDATE_TICKET);
// ticketRouter.delete(DELETE_TICKET);
// ticketRouter.post(CREATE_TICKET);
ticketRouter.get(GET_TICKETS, getTickets);

export default ticketRouter;