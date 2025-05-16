import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, RESOURCE_NOT_FOUND_RESPONSE } from "../../constants/constants.js";
import Users from "../../models/Users/Users.js";

const deleteUser = async (req, res) => {
    try {
        const user = req.params.uuid;

        if (!user) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Missing required fields" });
        }

        const UsersModel = await Users();

        await UsersModel.deleteMany({ uuid: user });

        return res.status(200).json(DEFAULT_OK_RESPONSE);
    } catch (error) {
        console.error("Error in deleteUser controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default deleteUser;