import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, RESOURCE_NOT_FOUND_RESPONSE } from "../../constants/constants.js";
import Users from "../../models/Users/Users.js";

const deleteUser = async (req, res) => {
    try {
        const { users } = req.body;

        if (!users) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Missing required fields" });
        }

        const UsersModel = await Users();

        const usersToDelete = await UsersModel.find({ uuid: { $in: users } }, { _id: 0, __v: 0 }).lean();

        if (!usersToDelete) {
            return res.status(404).json({ ...RESOURCE_NOT_FOUND_RESPONSE, message: "No users found" });
        }

        await UsersModel.deleteMany({ uuid: { $in: users } });

        return res.status(200).json(DEFAULT_OK_RESPONSE);
    } catch (error) {
        console.error("Error in deleteUser controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default deleteUser;