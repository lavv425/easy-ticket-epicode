import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, ERROR_RESPONSE, RESOURCE_NOT_FOUND_RESPONSE } from "../../constants/constants.js";
import Tickets from "../../models/Tickets/Tickets.js";

const updateTicket = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { title, description, status, priority } = req.body;

        if (!uuid) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: 'Ticket uuid is required' });
        }

        if (!title || !description || !status || !priority) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: 'All fields are mandatory' });
        }

        const TicketsModel = await Tickets();

        const ticket = await TicketsModel.findOne({ uuid }).lean();

        if (!ticket) {
            return res.status(404).json({ ...RESOURCE_NOT_FOUND_RESPONSE, message: 'Ticket not found' });
        }

        await TicketsModel.findOneAndUpdate({ uuid }, { title, description, status, priority });

        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, message: 'Ticket updated successfully' });
    } catch (error) {
        console.error("Error in updateTicket controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};
export default updateTicket;