import express from "express";
import GrupoPortaController from "../controllers/grupoPortaController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router
    .get("/grupoPortas", AuthMiddleware, GrupoPortaController.listarGrupoPortas)
    .get("/grupoPortas/:id", AuthMiddleware, GrupoPortaController.listarGrupoPortaId)
    .post("/grupoPortas", AuthMiddleware, GrupoPortaController.cadastrarGrupoPorta)
    .patch("/grupoPortas/:id", AuthMiddleware, GrupoPortaController.atualizarPatch)
    .put("/grupoPortas/:id", AuthMiddleware, GrupoPortaController.atualizarPut)
    .delete("/grupoPortas/:id", AuthMiddleware, GrupoPortaController.deletarGrupoPorta)

export default router;