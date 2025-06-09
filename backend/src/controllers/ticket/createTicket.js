
import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, ERROR_RESPONSE, FORBIDDEN_RESPONSE } from "../../constants/constants.js";
import Tickets from '../../models/Tickets/Tickets.js';
import { getUserFromJwt } from "../../utils/utils.js";

const createTicket = async (req, res) => {
    try {
        // this should be a middleware but ok, we care about the frontend
        const token = req.headers.authorization?.split(" ")?.[1];

        if (!token) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Token is required" });
        }

        const userUuid = getUserFromJwt(token);

        if (!userUuid) {
            return res.status(403).json({ ...FORBIDDEN_RESPONSE, message: "User not found" });
        }

        const { title, description, status, priority } = await req.body;

        if (!title || !description || !status || !priority) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Missing required fields" });
        };

        const TicketsModel = await Tickets();

        await TicketsModel.create({
            title,
            description,
            status,
            priority,
            created_by: userUuid,
        });

        return res.status(201).json({ ...DEFAULT_OK_RESPONSE, message: "Ticket created successfully" });
    } catch (error) {
        console.error("Error in createTicket controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default createTicket;