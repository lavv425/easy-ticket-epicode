import "../config/dotenv.js";
import { argon2id, hash } from "argon2";
import Users from "./Users/Users.js";

const main = async () => {
    try {
        console.log('Seeding the database...');

        const UsersModel = await Users();

        const baseUserPassword = process.env.BASE_USER_PASSWORD;

        if (!baseUserPassword) {
            console.error('BASE_USER_PASSWORD is not defined in the environment variables.');
            process.exit(1);
            return;
        }

        const baseUserInfo = {
            first_name: "Base",
            last_name: "User",
            email: "base@example.com",
            username: "base.user",
        }

        const existingUser = await UsersModel.findOne({
            $or: [
                { email: baseUserInfo.email },
                { first_name: baseUserInfo.first_name, last_name: baseUserInfo.last_name },
                { username: baseUserInfo.username },
            ],
        });

        if (existingUser) {
            console.log('User already exists, skipping...');
            process.exit(0);
            return;
        }

        const hashedPassword = await hash(baseUserPassword, {
            type: argon2id,
            memoryCost: 2 ** 17,
            timeCost: 7,
            parallelism: 4,
        });

        await UsersModel.create({
            ...baseUserInfo,
            password: hashedPassword,
        });

        console.log('Seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding the database:', error);
        process.exit(1);
    }
};

main();