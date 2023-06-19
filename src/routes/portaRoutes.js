import express from "express";
import PortaController from "../controllers/portaController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /portas:
 *    get:
 *      tags:
 *        - Portas
 *      summary: Lista todas as portas
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          rota: rota
 *          schema:
 *            type: string
 *          description: Nome da porta para filtrar
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
 *          description: Retorna a lista de portas
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/PortaSemId'
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
 *    post:
 *      tags:
 *        - Portas
 *      summary: Cadastrar uma nova porta
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PortaSemId'
 *      responses:
 *        '201':
 *          description: Rota cadastrada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PortaSemId'
 *        '400':
 *          description: Erro ao cadastrar porta
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
 *          description: Erro ao cadastrar porta
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
 *  /portas/{id}:
 *    get:
 *      tags:
 *        - Portas
 *      summary: Lista a porta pelo id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da porta para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Retorna a porta de acordo com o ID passado        
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    example: "647f607f6400b1996f3cef1d"
 *                  descricao:
 *                    type: string
 *                    example: "Porta do setor 4 parte de cima"
 *                  ambiente:
 *                    type: string
 *                    example: "Setor 4"
 *                  ativo:    
 *                    type: boolean
 *                    example: true
 *        '404':
 *          description: Porta não encontrada
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
 *                    example: "Porta não encontrada"
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
 *      summary: Atualiza apenas os atributos passados no body de uma porta existente no banco de dados
 *      tags:
 *        - Portas
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PortaSemId'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da porta a ser atualizada
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Porta atualizada com sucesso
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
 *                    example: "Porta atualizada com sucesso"
 *        '400':
 *          description: Erro ao atualizar a Porta
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
 *                    example: "Erro ao atualizar Porta"
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
 *      summary: Atualiza todos os atributos de uma porta existente no banco de dados.
 *      tags:
 *        - Portas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar uma rota existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PortaSemId'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da porta a ser atualizada
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Porta atualizada com sucesso
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
 *                    example: "Porta atualizada com sucesso"
 *        '400':
 *          description: Erro ao atualizar a Porta
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
 *                    example: "Erro ao atualizar porta"
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
    .get("/portas",AuthMiddleware, PortaController.listarPorta)
    .get("/portas/:id", AuthMiddleware, PortaController.listarPortaPorId)
    .post("/portas", AuthMiddleware, PortaController.cadastrarPorta)
    .patch("/portas/:id", AuthMiddleware, PortaController.atualizarPatch)
    .put("/portas/:id", AuthMiddleware, PortaController.atualizarPut)
    .delete("/portas/:id", AuthMiddleware, PortaController.deletePorta)

export default router;
