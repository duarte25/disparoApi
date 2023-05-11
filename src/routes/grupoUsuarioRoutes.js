import express from "express";
import GrupoUsuarioController from "../controllers/grupoUsuarioController";

const router = express.Router();

router
    .get("/grupoUsuarios", GrupoUsuarioController.listaGrupoUsuarios);

export default router; 
