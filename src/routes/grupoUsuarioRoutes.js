import express from "express";
import GrupoUsuarioController from "../controllers/grupoUsuarioController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /grupoUsuarios:
 *    get:
 *      tags:
 *        - Grupo de Usuarios
 *      summary: Lista todos os grupos de usuarios
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: Nome do grupo de usuário
 *          schema:
 *            type: string
 *          description: Nome do grupo de usuário para filtrar
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
 *          description: Retorna a lista de grupo de usuarios
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/GrupoUsuarios'
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
 *        
 *    post:
 *      tags:
 *        - Grupo de Usuarios
 *      summary: Cadastrar um novo grupo de usuarios
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GrupoUsuariosSemId'
 *      responses:
 *        '201':
 *          description: Grupo de usuarios cadastrado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GrupoUsuarios'
 *        '400':
 *          description: Erro ao cadastrar grupo de usuarios
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
 *  /grupoUsuarios/{id}:
 *    get:
 *      tags:
 *        - Grupo de Usuarios
 *      summary: Lista o grupo de usuarios pelo id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de usuarios para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      
 *      responses:
 *        '200':
 *          description: Retorna o grupo de usuarios de acordo com o ID passado        
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GrupoUsuarios'
 *        '404':
 *          description: Grupo de usuarios não encontrado
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
 *                    example: "Grupo de usuarios não encontrado"
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
 *     
 *    patch:
 *      summary: Atualiza apenas os atributos passados no body de um grupo de usuarios existente no banco de dados
 *      tags:
 *        - Grupo de Usuarios
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GrupoUsuariosSemId'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de usuarios a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Grupo de usuarios atualizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GrupoUsuarios'
 *        '400':
 *          description: Erro ao atualizar grupo de usuários
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
 *      summary: Atualiza todos os atributos de um grupo de usuarios existente no banco de dados.
 *      tags:
 *        - Grupo de Usuarios
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar um grupo de usuarios existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GrupoUsuariosSemId'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de usuarios a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Grupo de usuários atualizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GrupoUsuarios'
 *        '400':
 *          description: Erro ao atualizar grupo de usuários
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
 *    delete:
 *      summary: Deleta todos os atributos de um grupo de usuarios existente no banco de dados.
 *      tags:
 *        - Grupo de Usuarios
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por deletar um grupo de usuários existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GrupoUsuarioSemId'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de usuarios a ser deletada
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Grupo de usuarios deletado com sucesso
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
 *                    example: "grupo de usuarios deletado com sucesso"
 *        '400':
 *          description: Erro ao deletar grupo de usuarios
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
    .get("/grupoUsuarios", AuthMiddleware, GrupoUsuarioController.listarGrupoUsuarios)
    .get("/grupoUsuarios/:id", AuthMiddleware, GrupoUsuarioController.listarPorId)
    .post("/grupoUsuarios", AuthMiddleware, GrupoUsuarioController.cadastarGrupoUsuario)
    .patch("/grupoUsuarios/:id", AuthMiddleware, GrupoUsuarioController.atualizarPatch)
    .put("/grupoUsuarios/:id", AuthMiddleware, GrupoUsuarioController.atualizarPut)
    .delete("/grupoUsuarios/:id", AuthMiddleware, GrupoUsuarioController.deletarGrupoUsuarios)

export default router;
