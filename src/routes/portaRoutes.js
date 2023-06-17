import express from "express";
import PortaController from "../controllers/portaController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .get("/portas",AuthMiddleware, PortaController.listarPorta)
    .get("/portas/:id", AuthMiddleware, PortaController.listarPortaPorId)
    .post("/portas", AuthMiddleware, PortaController.cadastrarPorta)
    .patch("/portas/:id", AuthMiddleware, PortaController.atualizarPatch)
    .put("/portas/:id", AuthMiddleware, PortaController.atualizarPut)
    .delete("/portas/:id", AuthMiddleware, PortaController.deletePorta)

export default router;
