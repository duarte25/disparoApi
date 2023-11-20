import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import validaUsuario from "../utils/validacoes/validaUsuario.js";
import alterarsenhaController from "../controllers/alterarsenhaController.js";

const router = express.Router();


/**
 * @swagger
 * paths:
 *  /alterarsenha:
 *    post:
 *      tags:
 *          - Alterar Senha
 *      summary: Rota para alteração de senha do usuário
 *      parameters:
 *        - in: query
 *          name: token
 *          description: Token único encaminhado por e-mnail
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/login_token_altera_senha'
 *      responses:
 *        '200':
 *          description: Senha alterada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/login_token_altera_senha'
*/


router
  .post("/alterarsenha", AuthMiddleware, validaUsuario.validarSenha, alterarsenhaController.alterarsenha)

export default router;