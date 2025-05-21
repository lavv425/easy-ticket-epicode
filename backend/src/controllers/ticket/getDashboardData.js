import { DEFAULT_OK_RESPONSE, ERROR_RESPONSE } from "../../constants/constants.js";
import Tickets from "../../models/Tickets/Tickets.js";
import { getTicketsWithUser } from "../../utils/utils.js";

const getDashboardData = async (req, res) => {
    try {
        const TicketsModel = await Tickets();

        const tickets = await getTicketsWithUser(5);

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