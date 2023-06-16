import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
  .get("/usuarios",AuthMiddleware, UsuarioController.listarUsuarios)
  .get("/usuarios/:id" , AuthMiddleware, UsuarioController.listarUsuarioPorId)
  .post("/usuarios", AuthMiddleware, UsuarioController.cadastrarUsuario)
  .patch("/usuarios/:id", AuthMiddleware, UsuarioController.atualizarPatch)
  .put("/usuarios/:id", AuthMiddleware, UsuarioController.atualizarPut)
  .delete("/usuarios/:id", AuthMiddleware, UsuarioController.deletarUsuario)
  
 
export default router;