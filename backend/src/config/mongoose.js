import mongoose from 'mongoose'

const MONGO_HOST = process.env.MONGO_HOST || "";
const MONGO_PORT = process.env.MONGO_PORT || "";
const MONGO_USER = process.env.MONGO_USER || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_DATABASE = process.env.MONGO_DATABASE || "";

const MONGOOSE_CONFIG = {
    dbName: MONGO_DATABASE,
    user: MONGO_USER,
    pass: MONGO_PASSWORD,
    autoIndex: false,
    autoCreate: true,
    sanitizeFilter: true,
    bufferCommands: false,
};


const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}`;

const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(MONGO_URI, MONGOOSE_CONFIG);
        } catch (error) {
            console.error('Error during MongoDB connection:', error);
            // process.exit(1);
        }
    }
    return mongoose.connection;
}

const disconnectFromDatabase = async () => {
    if (mongoose.connection.readyState !== 0) {
        try {
            await mongoose.disconnect();
        } catch (error) {
            console.error('Error during MongoDB disconnection:', error);
        }
    }
}

const getModelOptions = async () => {
    const connection = await connectToDatabase();
    const MODEL_OPTIONS = {
        overwriteModels: true,
        connection
    };
    return MODEL_OPTIONS;
}
export { connectToDatabase, disconnectFromDatabase, getModelOptions };