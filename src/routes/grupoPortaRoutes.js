import express from "express";
import GrupoPortaController from "../controllers/grupoPortaController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .get("/grupoPortas", AuthMiddleware, GrupoPortaController.listarGrupoPortas)

export default router;