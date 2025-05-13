import mongoose from "mongoose";
import { randomUUID } from "crypto";
import { COLLECTION_ROLES } from "../../constants/constants";
import { getModelOptions } from "../../config/mongoose";

const RolesSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: randomUUID
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Roles = async () => {
    const MODEL_OPTIONS = await getModelOptions();
    return mongoose.model(COLLECTION_ROLES, RolesSchema, COLLECTION_ROLES, MODEL_OPTIONS);
};
export default Roles;