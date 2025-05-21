import { DEFAULT_OK_RESPONSE, ERROR_RESPONSE } from "../../constants/constants.js";
import { getTicketsWithUser } from '../../utils/utils.js';

const getTickets = async (req, res) => {
    try {
        const tickets = await getTicketsWithUser();

        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, data: { tickets } });
    } catch (error) {
        console.error("Error in getTickets controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default getTickets;