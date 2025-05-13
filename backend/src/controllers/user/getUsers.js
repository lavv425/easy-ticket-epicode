import { DEFAULT_OK_RESPONSE, ERROR_RESPONSE } from "../../constants/constants.js";
import Users from "../../models/Users/Users.js";
import { readableDate } from "../../utils/utils.js";

const getUsers = async (req, res) => {
    try {
        const UsersModel = await Users();
        const usersFound = await UsersModel.find({}, { password: 0, _id: 0, __v: 0 }).lean();


        const users = usersFound?.map(user => ({
            uuid: user.uuid,
            nome: user.first_name,
            cognome: user.last_name,
            email: user.email,
            username: user.username,
            sede: user.site,
            ruolo: user.role,
            dipartimento: user.department,
            "Data creazione": readableDate(user.created_at)
        }))

        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, data: users });
    } catch (error) {
        console.error("Error in getUsers controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default getUsers;