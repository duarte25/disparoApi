import mongoose from "mongoose";
import * as dotenv from "dotenv"

dotenv.config();

mongoose.set("strictQuery", false)

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

let db = mongoose.connection;

export default db;