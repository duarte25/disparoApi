import express from "express";
import RotaController from "../controllers/rotaController.js";

const router = express.Router();

router
  .get("/rotas", RotaController.listarRotas)
  .get("/rotas/:id", RotaController.listarPorId)
  .post("/rotas", RotaController.cadastrarRota)
  .patch("/rotas/:id", RotaController.atualizarPatch)
  .delete("/rotas/:id", RotaController.deletarRota)

export default router;