import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, ERROR_RESPONSE } from "../../constants/constants.js";
import Users from "../../models/Users/Users.js";

const updateUser = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { first_name, last_name, email, username, role } = await req.body;

        if (!first_name || !last_name || !email || !username || !role || !uuid) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Missing required fields" });
        }

        const UsersModel = await Users();
        const user = await UsersModel.findOne({ uuid }, { password: 0, _id: 0, __v: 0 }).lean();

        if (!user) {
            return falseResponse([], "Utente non trovato", 404);
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

        return res.status(200).json(DEFAULT_OK_RESPONSE);
    } catch (error) {
        console.error("Error in updateUser controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default updateUser;