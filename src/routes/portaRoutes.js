import express from "express";
import PortaController from "../controllers/portaController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .get("/portas",AuthMiddleware, PortaController.listarPorta)

export default router;
