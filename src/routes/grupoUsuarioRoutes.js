import express from "express";
import GrupoUsuarioController from "../controllers/grupoUsuarioController.js";

const router = express.Router();

router
    .get("/grupoUsuarios", GrupoUsuarioController.listarGrupoUsuarios);

export default router; 
