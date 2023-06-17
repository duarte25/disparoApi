import express from "express";
import LoginController from "../controllers/loginAutenticacao.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /login:
 *    post:
 *      tags:
 *        - Login
 *      summary:
 * 
 */

router
  .post("/login", LoginController.autenticar)

export default router;