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
 *      summary: Faz o login do usuário
 *      requestBody:
 *        content:
 *          application/json: 
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      responses:
 *        '200':
 *          description: Login realizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LoginResponse' 
 *        '400':
 *          description: Usuário ou senha inválida
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                    example: true
 *                  code:
 *                    type: integer
 *                    example: 400
 *                  message:
 *                    type: string
 *                    example: 'Usuário ou senha inválida'
 *        '403':
 *          description: Usuário inativo no sistema
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                    example: true
 *                  code:
 *                    type: integer
 *                    example: 403
 *                  message:
 *                    type: string
 *                    example: 'Usuário inativo no sistema'  
 */

router
  .post("/login", LoginController.autenticar)

export default router;