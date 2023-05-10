import { Express } from "express";
import rotaControleUsuario from "../controllers/rotaControleUsuario";

const router = Express.Router();

router
    .get("/Portas", rotaControleUsuario.listarPortas);
