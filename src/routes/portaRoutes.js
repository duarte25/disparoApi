import express from "express";
import PortaController from "../controllers/portaController.js";

const router = express.Router();

router
    .get("/portas", PortaController.listarPorta)

export default router;
