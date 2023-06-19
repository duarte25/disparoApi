import express from "express";
import GrupoPortaController from "../controllers/grupoPortaController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /grupoPortas:
 *    get:
 *      tags:
 *        - Grupo de Portas
 *      summary: Lista todos os grupos de portas
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: Nome do usuário
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
 *          description: Retorna a lista de grupo de portas
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/GrupoPortas'
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
 *        - Grupo de Portas
 *      summary: Cadastrar um novo grupo de porta
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GrupoPortasSemId'
 *      responses:
 *        '201':
 *          description: Grupo de portas cadastrado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GrupoPortas'
 *        '400':
 *          description: Erro ao cadastrar grupo de portas
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
 *  /grupoPortas/{id}:
 *    get:
 *      tags:
 *        - Grupo de Portas
 *      summary: Lista o grupo de portas pelo id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de portas para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      
 *      responses:
 *        '200':
 *          description: Retorna o grupo de portas de acordo com o ID passado        
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GrupoPortas'
 *        '404':
 *          description: Grupo de portas não encontrada
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
 *                    example: "Grupo de portas não encontrada"
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
 *      summary: Atualiza apenas os atributos passados no body de um grupo de portas existente no banco de dados
 *      tags:
 *        - Grupo de Portas
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GrupoPortasSemId'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de portas a ser atualizada
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Grupo de portas atualizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GrupoPortas'
 *        '400':
 *          description: Erro ao atualizar a rota
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
 *      summary: Atualiza todos os atributos de um grupo de portas existente no banco de dados.
 *      tags:
 *        - Grupo de Portas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar um grupo de portas existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GrupoPortasSemId'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do grupo de portas a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Grupo de portas atualizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GrupoPortas'
 *        '400':
 *          description: Erro ao atualizar a rota
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
 *    
 *  
 */


router
    .get("/grupoPortas", AuthMiddleware, GrupoPortaController.listarGrupoPortas)
    .get("/grupoPortas/:id", AuthMiddleware, GrupoPortaController.listarGrupoPortaId)
    .post("/grupoPortas", AuthMiddleware, GrupoPortaController.cadastrarGrupoPorta)
    .patch("/grupoPortas/:id", AuthMiddleware, GrupoPortaController.atualizarPatch)
    .put("/grupoPortas/:id", AuthMiddleware, GrupoPortaController.atualizarPut)
    .delete("/grupoPortas/:id", AuthMiddleware, GrupoPortaController.deletarGrupoPorta)

export default router;