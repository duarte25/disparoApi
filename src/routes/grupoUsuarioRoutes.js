import express from "express";
import GrupoUsuarioController from "../controllers/grupoUsuarioController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .get("/grupoUsuarios", AuthMiddleware, GrupoUsuarioController.listarGrupoUsuarios)
    .get("/grupoUsuarios/:id", AuthMiddleware, GrupoUsuarioController.listarPorId)
    .post("/grupoUsuarios", AuthMiddleware, GrupoUsuarioController.cadastarGrupoUsuario)
    .patch("/grupoUsuarios/:id", AuthMiddleware, GrupoUsuarioController.atualizarPatch)
    .put("/grupoUsuarios/:id", AuthMiddleware, GrupoUsuarioController.atualizarPut)
    .delete("/grupoUsuarios/:id", AuthMiddleware, GrupoUsuarioController.deletarGrupoUsuarios)

export default router; 
