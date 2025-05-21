import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, ERROR_RESPONSE, RESOURCE_NOT_FOUND_RESPONSE } from "../../constants/constants.js";
import Tickets from "../../models/Tickets/Tickets.js";
import Users from "../../models/Users/Users.js";
import { readableDate } from "../../utils/utils.js";

const getTicketDetails = async (req, res) => {
    try {
        const { viewing } = req.query;
        const { uuid } = req.params;

        if (!uuid) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: 'Ticket uuid is required' });
        }

        const isViewing = viewing === 'true' ? 1 : 0;

        const baseProjection = { title: 1, description: 1, status: 1, priority: 1, _id: 0 };

        const viewingProjection = {
            ...baseProjection,
            created_at: 1,
            created_by: 1,
        };

        const projection = isViewing ? viewingProjection : baseProjection;

        const TicketsModel = await Tickets();

        const ticket = await TicketsModel.findOne({ uuid }, projection).lean();
        if (!ticket) {
            return res.status(404).json({ ...RESOURCE_NOT_FOUND_RESPONSE, message: 'Ticket not found' });
        }

        let ticketReturn = ticket;

        if (isViewing) {
            const UsersModel = await Users();
            const userUuid = ticketReturn.created_by;

            const userFound = await UsersModel.findOne(
                { uuid: userUuid },
                { uuid: 1, first_name: 1, last_name: 1, _id: 0 }
            ).lean();

            ticketReturn = {
                ...ticketReturn,
                created_by: userFound ? `${userFound.first_name} ${userFound.last_name}` : 'User unknown',
                created_at: readableDate(ticketReturn.created_at),
            };
        }


        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, data: { ticket: ticketReturn } });
    } catch (error) {
        console.error("Error in getTickets controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};
export default getTicketDetails;