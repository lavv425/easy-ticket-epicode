import { DEFAULT_OK_RESPONSE, ERROR_RESPONSE } from "../../constants/constants.js";
import Tickets from "../../models/Tickets/Tickets.js";
import Users from "../../models/Users/Users.js";
import { readableDate } from "../../utils/utils.js";

const getDashboardData = async (req, res) => {
    try {
        const TicketsModel = await Tickets();
        const UsersModel = await Users();

        const ticketsFound = await TicketsModel.find({}, { _id: 0, __v: 0 }).lean().limit(5);
        const userUuids = [...new Set(ticketsFound?.map(t => t.created_by))];

        const usersFound = await UsersModel.find(
            { uuid: { $in: userUuids } },
            { uuid: 1, username: 1, _id: 0 }
        ).lean();

        const userMap = new Map(usersFound.map(u => [u.uuid, u.username]));

        const tickets = ticketsFound?.map((ticket) => ({
            uuid: ticket.uuid,
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            priority: ticket.priority,
            created_by: userMap.get(ticket.created_by) || 'Unknown',
            created_at: readableDate(ticket.created_at),
        }));

        const aggregation = await TicketsModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        const total = await TicketsModel.countDocuments();

        const statusCounts = aggregation.reduce((acc, { _id, count }) => {
            acc[_id] = count;
            return acc;
        }, {});

        statusCounts.total = total;

        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, data: { tickets, statusCounts } });
    } catch (error) {
        console.error("Error in getDashboardData controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default getDashboardData;