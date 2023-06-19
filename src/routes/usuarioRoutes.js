import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /usuarios:
 *    get:
 *      tags:
 *        - Usuarios
 *      summary: Lista todos os usuários
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          rota: rota
 *          schema:
 *            type: string
 *          description: Nome do usuário para filtrar
 *        - in: query
 *          name: page 
 *          schema:
 *            type: integer
 *          description: Qual é a página desejada para a busca
 *        - in: query
 *          name: perPage
 *          schema:
 *            type: integer
 *          description: Quantidade de registros por página
 *  
 *      responses:
 *        200:
 *          description: Retorna a lista de usuários
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Usuario'
 *                  totalDocs:
 *                    type: integer
 *                  limit:
 *                    type: integer
 *                  totalPages:
 *                    type: integer
 *                  page:
 *                    type: integer
 *                  pagingCounter:
 *                    type: integer
 *                  hasPrevPage:
 *                    type: integer
 *                  hasNextPage:
 *                    type: integer
 *                  prevPage:
 *                    type: integer
 *                  nextPage:
 *                    type: integer
 *        '500':
 *          description: Erro interno do servidor
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
 *                    example: "Erro interno do servidor"
 *        
 *    post:
 *      tags:
 *        - Usuarios
 *      summary: Cadastrar um novo usuário
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsuarioSemId'
 *      responses:
 *        '201':
 *          description: Usuário cadastrado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Usuario'
 *        '400':
 *          description: Erro ao cadastrar usuário
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
 *                    example: "Mensagem de erro"
 *        '500':
 *          description: Erro interno do servidor
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
 *                    example: "Erro interno do servidor"
 *   
 *  /usuarios/{id}:
 *    get:
 *      tags:
 *        - Usuarios
 *      summary: Lista o usuário pelo id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do usuário para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      
 *      responses:
 *        '200':
 *          description: Retorno usuário de acordo com o ID passado        
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Usuario'
 *        '404':
 *          description: Usuário não encontrado
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
 *                    example: 404
 *                  message:
 *                    type: string
 *                    example: "Usuário não encontrado"
 *        '400':
 *          description: ID inválido
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
 *                    example: 404
 *                  message:
 *                    type: string
 *                    example: "ID inválido"
 *        '500':
 *          description: Erro interno do servidor
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
 *                    example: 500
 *                  message:
 *                    type: string
 *                    example: "Erro interno do servidor"
 *        
 *     
 *    patch:
 *      summary: Atualiza apenas os atributos passados no body de um usuário existente no banco de dados
 *      tags:
 *        - Usuarios
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsuarioSemId'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do usuário a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Usuário atualizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code: 
 *                    type: integer
 *                    example: 200
 *                  message:
 *                    type: string
 *                    example: "Usuário atualizado com sucesso"
 *        '400':
 *          description: Erro ao atualizar o usuário
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
 *                    example: "Mensagem de erro"
 *        '500':
 *          description: Erro interno do servidor
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
 *                    example: 500
 *                  message:
 *                    type: string
 *                    example: "Erro interno do servidor"
 *    put:
 *      summary: Atualiza todos os atributos de um usuário existente no banco de dados.
 *      tags:
 *        - Usuarios
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar um usuário existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsuarioSemId'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do usuário a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Usuário atualizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code: 
 *                    type: integer
 *                    example: 200
 *                  message:
 *                    type: string
 *                    example: "Usuário atualizado com sucesso"
 *        '400':
 *          description: Erro ao atualizar o usuário
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
 *                    example: "Mensagem de erro"
 *        '500':
 *          description: Erro interno do servidor
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
 *                    example: 500
 *                  message:
 *                    type: string
 *                    example: "Erro interno do servidor"
 */

router
  .get("/usuarios",AuthMiddleware, UsuarioController.listarUsuarios)
  .get("/usuarios/:id" , AuthMiddleware, UsuarioController.listarUsuarioPorId)
  .post("/usuarios", AuthMiddleware, UsuarioController.cadastrarUsuario)
  .patch("/usuarios/:id", AuthMiddleware, UsuarioController.atualizarPatch)
  .put("/usuarios/:id", AuthMiddleware, UsuarioController.atualizarPut)
  .delete("/usuarios/:id", AuthMiddleware, UsuarioController.deletarUsuario)
  
 
export default router;