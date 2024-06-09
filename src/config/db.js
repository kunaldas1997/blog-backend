import mongoose from "mongoose";
import config from './config.json' with {type: "json"};
export const connect = async () => {
    try {
        const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
        await mongoose.connect(config.configuration.mongoURL, clientOptions);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};