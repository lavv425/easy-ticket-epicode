import { verify } from "argon2";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, ERROR_RESPONSE, FORBIDDEN_RESPONSE, JWT_BASE_SETTINGS, JWT_SECRET, RESOURCE_NOT_FOUND_RESPONSE } from "../../../constants/constants.js";
import Users from "../../../models/Users/Users.js";

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Username and password are required" });
        }

        const UsersModel = await Users();

        const user = await UsersModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ ...RESOURCE_NOT_FOUND_RESPONSE, message: "User not found!" });
        }

        const isLoginValid = await verify(user.password, password);
        if (!isLoginValid) {
            return res.status(401).json({ ...FORBIDDEN_RESPONSE, message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.uuid, role: user.role },
            JWT_SECRET,
            {
                ...JWT_BASE_SETTINGS,
                subject: user.uuid,
                jwtid: randomUUID(),
            }
        );

        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, data: { token } });
    } catch (error) {
        console.error("Error in login controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default login;