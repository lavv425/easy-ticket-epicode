import mongoose from "mongoose";
import { randomUUID } from "crypto";
import { COLLECTION_USERS, USER_ROLES } from "../../constants/constants.js";
import { EMAIL_REGEX } from "../../constants/validation.js";
import { getModelOptions } from "../../config/mongoose.js";

const UsersSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: randomUUID,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: EMAIL_REGEX,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Users = async () => {
    const MODEL_OPTIONS = await getModelOptions();
    return mongoose.model(COLLECTION_USERS, UsersSchema, COLLECTION_USERS, MODEL_OPTIONS);
};
export default Users;
