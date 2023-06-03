import express from "express";
import RotaController from "../controllers/rotaController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
  .get("/rotas", AuthMiddleware, RotaController.listarRotas)
  .get("/rotas/:id", AuthMiddleware, RotaController.listarPorId)
  .post("/rotas", AuthMiddleware, RotaController.cadastrarRota)
  .patch("/rotas/:id", AuthMiddleware, RotaController.atualizarPatch)
  .put("/rotas/:id", AuthMiddleware, RotaController.atualizarPut)
  .delete("/rotas/:id", AuthMiddleware, RotaController.deletarRota)

export default router;