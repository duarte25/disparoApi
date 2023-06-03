import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
  .get("/usuarios",AuthMiddleware, UsuarioController.listarUsuarios)
  
 
export default router;