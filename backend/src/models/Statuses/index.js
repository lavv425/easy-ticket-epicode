import mongoose from "mongoose";
import { randomUUID } from "crypto";
import { COLLECTION_STATUSES } from "../../constants/constants";
import { getModelOptions } from "../../config/mongoose";

const StatusesSchema = new mongoose.Schema({
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

const Statuses = async () => {
    const MODEL_OPTIONS = await getModelOptions();
    return mongoose.model(COLLECTION_STATUSES, StatusesSchema, COLLECTION_STATUSES, MODEL_OPTIONS);
};
export default Statuses;