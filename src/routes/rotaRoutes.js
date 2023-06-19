import express from "express";
import RotaController from "../controllers/rotaController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /rotas:
 *    get:
 *      tags:
 *        - Rotas
 *      summary: Lista todas as rotas
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          rota: rota
 *          schema:
 *            type: string
 *          description: Nome da rota para filtrar
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
 *          description: Retorna a lista de rotas
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Rota'
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
 *          description: Erro ao listar todas as rotas
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
 *        - Rotas
 *      summary: Cadastrar uma nova rota
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RotaSemId'
 *      responses:
 *        '201':
 *          description: Rota cadastrada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rota'
 *        '400':
 *          description: Erro ao cadastrar rota
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
 *          description: Erro ao cadastrar rota
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
 *  /rotas/{id}:
 *    get:
 *      tags:
 *        - Rotas
 *      summary: Lista a rota pelo id
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      
 *      responses:
 *        '200':
 *          description: Retorna a rota de acordo com o ID passado        
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    example: "647f607f6400b1996f3cef1d"
 *                  rota:
 *                    type: string
 *                    example: "one piece"
 *                  dominio:
 *                    type: string
 *                    example: "localhost"
 *                  ativo:    
 *                    type: boolean
 *                    example: true
 *                  verbo_get:
 *                    type: boolean
 *                    example: true
 *                  verbo_post:
 *                    type: boolean
 *                    example: true
 *                  verbo_patch:
 *                    type: boolean
 *                    example: true
 *                  verbo_put:
 *                    type: boolean
 *                    example: true
 *                  verbo_delete:
 *                    type: boolean
 *                    example: true
 *        '404':
 *          description: Rota não encontrada
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
 *                    example: "Rota não encontrada"
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
 *      summary: Atualiza apenas os atributos passados no body de uma rota existente no banco de dados
 *      tags:
 *        - Rotas
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rota'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota a ser atualizada
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Rota atualizada com sucesso
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
 *                    example: "Rota atualizada com sucesso"
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
 *                    example: "Erro ao atualizar rota"
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
 *      summary: Atualiza todos os atributos de uma rota existente no banco de dados.
 *      tags:
 *        - Rotas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar uma rota existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rota'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da rota a ser atualizada
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Rota atualizada com sucesso
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
 *                    example: "Rota atualizada com sucesso"
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
 *                    example: "Erro ao atualizar rota"
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
 */         


router
  .get("/rotas", AuthMiddleware, RotaController.listarRotas)
  .get("/rotas/:id", AuthMiddleware, RotaController.listarPorId)
  .post("/rotas", AuthMiddleware, RotaController.cadastrarRota)
  .patch("/rotas/:id", AuthMiddleware, RotaController.atualizarPatch)
  .put("/rotas/:id", AuthMiddleware, RotaController.atualizarPut)
  .delete("/rotas/:id", AuthMiddleware, RotaController.deletarRota)

export default router;


