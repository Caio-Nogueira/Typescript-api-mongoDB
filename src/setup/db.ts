import mongoose from "mongoose";
import dotenv from "dotenv";
import populateUsers from "../utils/user.populate";

dotenv.config();

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env;

const db = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
mongoose.connect(db);

mongoose.connection.once("open", () => {
    console.log("Connected to database. Populatig users...");
    populateUsers();   
});

mongoose.connection.on("error", (err) => {
    console.log("Error connecting to database", err);
});

export default mongoose;