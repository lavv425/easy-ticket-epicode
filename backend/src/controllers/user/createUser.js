import { argon2id, hash } from "argon2";
import { BAD_REQUEST_RESPONSE, DEFAULT_OK_RESPONSE, ERROR_RESPONSE } from "../../constants/constants.js";
import Users from "../../models/Users/Users.js";

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, username, password } = req.body;

        if (!first_name || !last_name || !email || !username || !password) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Missing required fields" });
        }

        const UsersModel = await Users();

        const existingUser = await UsersModel.findOne({
            $or: [
                { email },
                { first_name, last_name },
                { username }
            ],
        });

        if (existingUser) {
            return res.status(400).json({ ...BAD_REQUEST_RESPONSE, message: "Another user with the same email, name or username already exists" });
        }

        const hashedPassword = await hash(password, {
            type: argon2id,
            memoryCost: 2 ** 17, // 128MB
            timeCost: 7,        // Numero di iterazioni
            parallelism: 4,     // Numero di thread paralleli
        });

        await UsersModel.create({
            first_name,
            last_name,
            email,
            username,
            password: hashedPassword,
        });

        return res.status(201).json(DEFAULT_OK_RESPONSE);
    } catch (error) {
        console.error("Error in createUser controller:", error);
        return res.status(500).json({ ...ERROR_RESPONSE, message: "Internal server error" });
    }
};

export default createUser;