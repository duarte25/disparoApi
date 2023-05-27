import express from "express";
import RotaController from "../controllers/rotaController.js";

const router = express.Router();

router
  .get("/rotas", RotaController.listarRotas)

export default router;