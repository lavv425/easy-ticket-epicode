import jwt from "jsonwebtoken";
import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, ERROR_RESPONSE, JWT_SECRET } from "../../../constants/constants.js";

const validateToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")?.[1];

        if (!token) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Token is required" });
        }

        jwt.verify(token, JWT_SECRET);

        return res.status(200).json({ ...DEFAULT_OK_RESPONSE, message: "Token is valid" });
    } catch (error) {
        console.error("Error in validateToken controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default validateToken;