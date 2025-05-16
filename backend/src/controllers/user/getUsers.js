import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, ERROR_RESPONSE } from "../../constants/constants.js";
import Users from "../../models/Users/Users.js";
import { getUserFromJwt, readableDate } from "../../utils/utils.js";

const getUsers = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")?.[1];

        if (!token) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Token is required" });
        }

        const userUuid = getUserFromJwt(token);

        const UsersModel = await Users();
        const usersFound = await UsersModel.find({ uuid: { $ne: userUuid } }, { password: 0, _id: 0, __v: 0 }).lean();

        const users = usersFound?.map(user => ({
            uuid: user.uuid,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            created_at: readableDate(user.created_at)
        }))

        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, data: users });
    } catch (error) {
        console.error("Error in getUsers controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default getUsers;