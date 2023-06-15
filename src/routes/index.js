import express from "express";
import usuarios from "./usuarioRoutes.js";
import portas from "./portaRoutes.js";
import grupoUsuarios from "./grupoUsuarioRoutes.js";
import grupoPortas from "./grupoPortaRoutes.js";
import rotas from "./rotaRoutes.js";
import login from "./loginRoutes.js";

// Aqui vai estar todos os componentes para utilizar no Swagger.
/**
 * @swagger
 * components:
 *  schemas:
 *       Rota:
 *          type: object
 *          properties:
 *      Usuario:
 *          type: object
 *      Porta:
 *          type: object
 *      GrupoUsuarios:
 *          type: object
 *      GrupoPortas:
 *          type: object    
 * 
 */


const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).redirect("/docs");
  })

  app.use(
    express.json(),
    usuarios,
    portas,
    grupoUsuarios,
    grupoPortas,
    rotas,
    login
  )

}

export default routes;