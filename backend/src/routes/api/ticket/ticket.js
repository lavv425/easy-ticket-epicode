import { Router } from "express";
import { CREATE_TICKET, DELETE_TICKET, GET_DASHBOARD_TICKETS, GET_TICKET, GET_TICKETS, UPDATE_TICKET } from "../../../constants/routes/routes.js";
import getTickets from "../../../controllers/ticket/getTickets.js";
import createTicket from "../../../controllers/ticket/createTicket.js";
import deleteTicket from "../../../controllers/ticket/deleteTicket.js";
import getDashboardData from "../../../controllers/ticket/getDashboardData.js";

const ticketRouter = new Router();

// ticketRouter.get(GET_TICKET);
// ticketRouter.put(UPDATE_TICKET);
ticketRouter.delete(DELETE_TICKET, deleteTicket);
ticketRouter.post(CREATE_TICKET, createTicket);
ticketRouter.get(GET_TICKETS, getTickets);
ticketRouter.get(GET_DASHBOARD_TICKETS, getDashboardData);

export default ticketRouter;