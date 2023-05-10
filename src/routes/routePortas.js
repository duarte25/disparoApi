import express from "express";
import PortaController from "../controllers/PortaController.js";

const router = express.Router();

router
    .get("/portas", PortaController.listarPortas)



    export default router;
