import mongoose from "mongoose";
import { randomUUID } from "crypto";
import { COLLECTION_TICKETS, TICKET_PRIORITIES, TICKET_STATUSES } from "../../constants/constants.js";
import { getModelOptions } from "../../config/mongoose.js";

const TicketsSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: randomUUID,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(TICKET_STATUSES),
        required: true
    },
    priority: {
        type: String,
        enum: Object.values(TICKET_PRIORITIES),
        required: true
    },
    created_by: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

const Tickets = async () => {
    const MODEL_OPTIONS = await getModelOptions();
    return mongoose.model(COLLECTION_TICKETS, TicketsSchema, COLLECTION_TICKETS, MODEL_OPTIONS);
};
export default Tickets;