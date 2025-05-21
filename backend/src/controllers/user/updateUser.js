import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, ERROR_RESPONSE, RESOURCE_NOT_FOUND_RESPONSE } from "../../constants/constants.js";
import Users from "../../models/Users/Users.js";

const updateUser = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { first_name, last_name, email, username, role } = req.body;

        if (!first_name || !last_name || !email || !username || !uuid) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Missing required fields" });
        }

        const UsersModel = await Users();
        const user = await UsersModel.findOne({ uuid }, { password: 0, _id: 0, __v: 0 }).lean();

        if (!user) {
            return res.status(404).json({ ...RESOURCE_NOT_FOUND_RESPONSE, message: 'User not found' });
        }

        const duplicate = await UsersModel.findOne({
            uuid: { $ne: uuid },
            $or: [
                { email: email },
                { first_name, last_name },
                { username }
            ]
        });

        if (duplicate) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Another user with the same email, name or username already exists" });
        }

        await UsersModel.findOneAndUpdate(
            { uuid },
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                username: username,
                role: role,
            }
        );

        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, message: 'User updated successfully' });
    } catch (error) {
        console.error("Error in updateUser controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default updateUser;