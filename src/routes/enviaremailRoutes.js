import express from "express";
import enviaremailController from "../controllers/enviaremailController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";


const router = express.Router();

/**
 * @swagger
 * paths:
 *  /enviaremail:
 *    post:
 *      tags:
 *          - Recuperar Senha
 *      summary: Enviar e-mail de alerta de erro para o administrador do sistema
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/enviaremail'
 *      responses:
 *        '200':
 *          description: Email enviado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/enviaremail'
*/

router
  .post("/enviaremail", enviaremailController.enviarEmail);

export default router;