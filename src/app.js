import express  from "express";
import cors from "cors";
import db from "./config/dbConnect.js";

export function connectDatabase() {
  db.on("error", console.log.bind(console, "Conexão com o banco falhou"))
  db.once("open", () => console.log("Conexão com o banco estabelecida!"))
}

// conectando o banco
connectDatabase();

// instanciando o express
const app = express();

// usar apenas formato json
app.use(express.json());

app.use(cors());

// routes(app);

export default app;