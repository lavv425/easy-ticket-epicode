import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, ERROR_RESPONSE, RESOURCE_NOT_FOUND_RESPONSE } from "../../constants/constants.js";
import Users from "../../models/Users/Users.js";

const getUser = async (req, res) => {
    try {
        const { uuid } = req.params;
        if (!uuid) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Missing data" });
        }
        
        const UsersModel = await Users();
        const user = await UsersModel.findOne({ uuid }, { password: 0, _id: 0, __v: 0 }).lean();

        if (!user) {
            return res.status(404).json({ ...RESOURCE_NOT_FOUND_RESPONSE, message: "User not found" });
        }

        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, data: { user } });
    } catch (error) {
        console.error("Error in getUser controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default getUser;