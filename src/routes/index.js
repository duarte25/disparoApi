import express from "express";
import usuarios from "./usuarioRoutes.js";
import portas from "./portaRoutes.js";
import grupoUsuarios from "./grupoUsuarioRoutes.js";
import grupoPortas from "./grupoPortaRoutes.js";
import rotas from "./rotaRoutes.js";
import login from "./loginRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).json({ message: "Bem vindo a API - Fechadura Inteligente <3" })
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