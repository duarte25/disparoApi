import express from "express";
import UsuarioController from "../controllers/usuarioController.js";

const router = express.Router();

router
  .get("/usuarios", UsuarioController.listarUsuarios)
  
 
export default router;