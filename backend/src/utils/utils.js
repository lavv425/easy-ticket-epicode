import { JWT_SECRET, TICKET_PRIORITY_LABELS, TICKET_STATUS_LABELS } from "../constants/constants.js";
import jwt from 'jsonwebtoken';
import Tickets from "../models/Tickets/Tickets.js";
import Users from "../models/Users/Users.js";

export const readableDate = (date) => {
    if (!date) return null;

    if (!(date instanceof Date)) {
        date = new Date(date);

        if (isNaN(d.getTime())) {
            return null;
        }
    }

    return new Date(date).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}


export const getUserFromJwt = (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.uuid) {
        return null;
    }

    return decoded?.uuid; // {uuid: string} SHOULD BE ALWAYS PRESENT, BUT JUST TO BE SURE LET'S USE IT AS NULLISH x?.uuid
};

export const getTicketsWithUser = async (limit = 0) => {
    try {
        const TicketsModel = await Tickets();
        const UsersModel = await Users();

        const ticketsFound = await TicketsModel.find({}, { _id: 0, __v: 0 }).lean().limit(limit);
        const userUuids = [...new Set(ticketsFound?.map(t => t.created_by))];

        const usersFound = await UsersModel.find(
            { uuid: { $in: userUuids } },
            { uuid: 1, first_name: 1, last_name: 1, _id: 0 }
        ).lean();

        const userMap = new Map(usersFound.map(u => [u.uuid, `${u.first_name} ${u.last_name}`]));

        const tickets = ticketsFound?.map((ticket) => ({
            uuid: ticket.uuid,
            title: ticket.title,
            description: ticket.description,
            status: TICKET_STATUS_LABELS[ticket.status],
            priority: TICKET_PRIORITY_LABELS[ticket.priority],
            created_by: userMap.get(ticket.created_by) || 'Unknown',
            created_at: readableDate(ticket.created_at),
        }));

        return tickets;
    } catch (error) {
        throw error;
    }
};
