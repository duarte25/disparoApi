import express from "express";
import GrupoUsuarioController from "../controllers/grupoUsuarioController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .get("/grupoUsuarios", AuthMiddleware, GrupoUsuarioController.listarGrupoUsuarios);

export default router; 
