import express from "express";
import confirmaemailController from "../controllers/confirmaemailController.js";


const router = express.Router();

/**
 * @swagger
 * paths:
 *  /confirmaemail:
 *    post:
 *      tags:
 *          - Recuperar Senha
 *      summary: Enviar o e-mail para recuperação de senha
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/confirmaemail'
 *      responses:
 *        '200':
 *          description: Login realizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/confirmaemail'
*/

router
  .post("/confirmaemail", confirmaemailController.confirmar)


export default router;