import { DEFAULT_OK_RESPONSE, ERROR_RESPONSE } from "../../constants/constants.js";
import Tickets from "../../models/Tickets/Tickets.js";
import { readableDate } from "../../utils/utils.js";

const getTickets = async (req, res) => {
    try {
        const TicketsModel = await Tickets();

        const ticketsFound = await TicketsModel.find({}, { _id: 0, __v: 0 }).lean();

        const tickets = ticketsFound?.map((ticket) => ({
            uuid: ticket.uuid,
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            priority: ticket.priority,
            created_by: ticket.created_by,
            created_at: readableDate(ticket.created_at),
        }));

        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, data: { tickets } });
    } catch (error) {
        console.error("Error in getTickets controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default getTickets;