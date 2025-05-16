import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, ERROR_RESPONSE } from "../../constants/constants.js";
import Tickets from "../../models/Tickets/Tickets.js";

const deleteTicket = async (req, res) => {
    try {
        const ticket = req.params.uuid;

        if (!ticket) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Missing required fields" });
        }

        const TicketsModel = await Tickets();
        await TicketsModel.deleteMany({ uuid: ticket });

        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, message: "Ticket deleted successfully" });
    } catch (error) {
        console.error("Error in deleteTicket controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default deleteTicket;