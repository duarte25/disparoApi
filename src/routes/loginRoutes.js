import express from "express";
import LoginController from "../controllers/loginAutenticacao.js";

const router = express.Router();

router
  .post("/login", LoginController.autenticar)

export default router;