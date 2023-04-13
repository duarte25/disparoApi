import mongoose from "mongoose";
import * as dotenv from "dotenv"

dotenv.config();

mongoose.set("strictQuery", false)

await mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((response) => console.log('Conexão com o banco estabelecida !')
).catch(error => console.log("Erro na conexão com o banco de dados"))

let db = mongoose.connection;

export default db;