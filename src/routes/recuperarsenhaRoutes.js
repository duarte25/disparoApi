import express from "express";
import recuperasenhaController from "../controllers/recuperasenhaController.js";


const router = express.Router();

/**
 * @swagger
 * paths:
 *  /recuperarsenha:
 *    post:
 *      tags:
 *          - Recuperar Senha
 *      summary: Enviar o e-mail para recuperação de senha
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/recuperarsenha'
 *      responses:
 *        '200':
 *          description: Login realizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/recuperarsenha'
*/

router
  .post("/recuperarsenha", recuperasenhaController.recuperar)


export default router;