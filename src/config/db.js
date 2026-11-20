import mongoose from "mongoose";

const connectDB = async () => {
    const {
        MONGO_HOST,
        MONGO_PORT,
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_DB,
        MONGO_AUTH_SOURCE,
    } = process.env;

    const user = encodeURIComponent(MONGO_USER);
    const password = encodeURIComponent(MONGO_PASSWORD);

    const uri = `mongodb://${user}:${password}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONGO_AUTH_SOURCE}`;

    await mongoose.connect(uri);
    console.log("Conexión establecida con MongoDB");
};

export default connectDB;