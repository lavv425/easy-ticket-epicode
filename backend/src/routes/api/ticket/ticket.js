import { Router } from "express";
import { CREATE_TICKET, DELETE_TICKET, GET_DASHBOARD_TICKETS, GET_TICKET, GET_TICKETS, UPDATE_TICKET } from "../../../constants/routes/routes.js";
import getTickets from "../../../controllers/ticket/getTickets.js";
import createTicket from "../../../controllers/ticket/createTicket.js";
import deleteTicket from "../../../controllers/ticket/deleteTicket.js";
import getDashboardData from "../../../controllers/ticket/getDashboardData.js";
import getTicketDetails from "../../../controllers/ticket/getTicketDetails.js";
import updateTicket from "../../../controllers/ticket/updateTicket.js";

const ticketRouter = new Router();

ticketRouter.delete(DELETE_TICKET, deleteTicket);
ticketRouter.put(UPDATE_TICKET, updateTicket);
ticketRouter.post(CREATE_TICKET, createTicket);
ticketRouter.get(GET_TICKETS, getTickets);
ticketRouter.get(GET_DASHBOARD_TICKETS, getDashboardData);
ticketRouter.get(GET_TICKET, getTicketDetails);

export default ticketRouter;