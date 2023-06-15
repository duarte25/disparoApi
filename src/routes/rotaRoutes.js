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
 *                      $ref: '#/components/schemas/rota'
 *                  totalDocs:
 *                    type: integer
 *                  limit:
 *                    type: integer
 *                  totalPages:
 *                    type: integer,
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


