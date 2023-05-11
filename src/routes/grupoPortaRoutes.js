import express from "express";
import GrupoPortaController from "../controllers/grupoPortaController.js";

const router = express.Router();

router
    .get("/grupoPortas", GrupoPortaController.listarGrupoPorta)

export default router;