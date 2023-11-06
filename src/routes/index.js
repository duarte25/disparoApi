import express from "express";
import usuarios from "./usuarioRoutes.js";
import portas from "./portaRoutes.js";
import grupoUsuarios from "./grupoUsuarioRoutes.js";
import grupoPortas from "./grupoPortaRoutes.js";
import rotas from "./rotaRoutes.js";
import login from "./loginRoutes.js";
import enviarEmail from "./enviaremailRoutes.js"

// Aqui vai estar todos os componentes para utilizar no Swagger.

/**
 * @swagger
 * components:
 *  schemas:
 *    Rota:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          example: "63759607e0a9fb91607a8c6d"
 *        rota:
 *          type: string,
 *          example: "Barba Negra"
 *        dominio:
 *          type: string,
 *          example: "localhost"
 *        ativo:
 *          type: boolean
 *          example: false
 *        verbo_get:
 *          type: boolean
 *          example: true
 *        verbo_post:
 *          type: boolean
 *          example: true
 *        verbo_patch:
 *          type: boolean
 *          example: true
 *        verbo_put:
 *          type: boolean
 *          example: true
 *        verbo_delete:
 *          type: boolean
 *          example: true
 *    
 *    RotaSemId:
 *      type: object
 *      properties:  
 *        rota:
 *          type: string,
 *          example: "Barba Negra"
 *        dominio:
 *          type: string,
 *          example: "localhost"
 *        ativo:
 *          type: boolean
 *          example: false
 *        verbo_get:
 *          type: boolean
 *          example: true
 *        verbo_post:
 *          type: boolean
 *          example: true
 *        verbo_patch:
 *          type: boolean
 *          example: true
 *        verbo_put:
 *          type: boolean
 *          example: true
 *        verbo_delete:
 *          type: boolean
 *          example: true
 *    
 *    Usuario:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          example: "63759607e0a9fb91607a8c6d"
 *        nome:
 *          type: string
 *          example: "Barba Negra"
 *        email: 
 *          type: string
 *          example: "barbanegra@gmail.com"
 *        senha:
 *          type: string
 *          example: asdag12341a124sdc123
 *        link_foto:
 *          type: string
 *          example: "https://googleimages.barbanegra.com"
 *        ativo:
 *          type: boolean
 *          example: true
 *        rfid:
 *          type: string
 *          example: "dasgasdasdqwe1312312rassd"
 *        iris:
 *          type: string
 *          example: "215122zsdfzfqw4123123dasd"
 *        digital:
 *          type: array
 *          example: [ { digital: "dasgfasdasfas" }, { digital: "asdasfasdas" } ]
 *        rotas:
 *          type: array
 *          example: [ { _id: "63759607e0a9fb91607a8c6d", rota: "barba negra", dominio: "localhost", ativo: true, verbo_get: true, verbo_post: true, verbo_patch: true, verbo_put: true, verbo_delete: true }]
 *        grupoPortas:
 *          type: array
 *          example: [ { nome: "Professores ADS", descricao: "Grupo de professores de ADS", ativo: true, aberto: true, portas: [ { _id: "63759607e0a9fb91607a8c6d"} ] ,_id: "63759607e0a9fb91607a8c6d" } ]
 *        grupoUsuarios:
 *          type: array
 *          example: [ { nome: "CAED", descricao: "Grupo destinado aos funcionários da CAED para acessar o sistema", ativo: true, rotas:  [ { _id: "63759607e0a9fb91607a8c6d", rota: "barba negra", dominio: "localhost", ativo: true, verbo_get: true, verbo_post: true, verbo_patch: true, verbo_put: true, verbo_delete: true } ] ,_id: "63759607e0a9fb91607a8c6d" } ]
 *    
 *    UsuarioSemId:
 *      type: object
 *      properties:
 *        nome:
 *          type: string
 *          example: "Barba Negra"
 *        email: 
 *          type: string
 *          example: "barbanegra@gmail.com"
 *        senha:
 *          type: string
 *          example: asdag12341a124sdc123
 *        link_foto:
 *          type: string
 *          example: "https://googleimages.barbanegra.com"
 *        ativo:
 *          type: boolean
 *          example: true
 *        rfid:
 *          type: string
 *          example: "dasgasdasdqwe1312312rassd"
 *        iris:
 *          type: string
 *          example: "215122zsdfzfqw4123123dasd"
 *        digital:
 *          type: array
 *          example: [ { digital: "dasgfasdasfas" }, { digital: "asdasfasdas" } ]
 *        rotas:
 *          type: array
 *          example: [ { _id: "63759607e0a9fb91607a8c6d", rota: "barba negra", dominio: "localhost", ativo: true, verbo_get: true, verbo_post: true, verbo_patch: true, verbo_put: true, verbo_delete: true }]
 *        grupoPortas:
 *          type: array
 *          example: [ { _id: "63759607e0a9fb91607a8c6d" } ]
 *        grupoUsuarios:
 *          type: array
 *          example: [ { _id: "63759607e0a9fb91607a8c6d" } ]    
 * 
 *    Porta:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          example: "63759607e0a9fb91607a8c6d"
 *        descricao:
 *          type: string
 *          example: "Porta do setor 4 parte de cima"
 *        ambiente:
 *          type: string
 *          example: "Setor 4"
 *        ativo:
 *          type: boolean
 *          example: true
 * 
 *    PortaSemId:
 *      type: object
 *      properties:
 *        descricao:
 *          type: string
 *          example: "Porta do setor 4 parte de cima"
 *        ambiente:
 *          type: string
 *          example: "Setor 4"
 *        ativo:
 *          type: boolean
 *          example: true
 *    
 *    GrupoUsuarios:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          example: "63759607e0a9fb91607a8c6d"
 *        nome: 
 *          type: string
 *          example: "CAED"
 *        descricao:
 *          type: string
 *          example: "Grupo destinado aos funcionários da CAED para acessar o sistema"
 *        ativo:
 *          type: boolean
 *          example: true
 *        rotas:
 *          type: array
 *          example: [ { _id: "63759607e0a9fb91607a8c6d", rota: "barba negra", dominio: "localhost", ativo: true, verbo_get: true, verbo_post: true, verbo_patch: true, verbo_put: true, verbo_delete: true } ]
 *    
 *    GrupoUsuariosSemId:
 *      type: object
 *      properties:
 *        nome: 
 *          type: string
 *          example: "CAED"
 *        descricao:
 *          type: string
 *          example: "Grupo destinado aos funcionários da CAED para acessar o sistema"
 *        ativo:
 *          type: boolean
 *          example: true
 *        rotas:
 *          type: array
 *          example: [ { _id: "63759607e0a9fb91607a8c6d", rota: "barba negra", dominio: "localhost", ativo: true, verbo_get: true, verbo_post: true, verbo_patch: true, verbo_put: true, verbo_delete: true } ]  
 *      
 *    GrupoPortas:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          example: "63759607e0a9fb91607a8c6d"
 *        nome:
 *          type: string
 *          example: "Professores ADS"
 *        descricao:
 *          type: string
 *          example: "Grupo de professores do ADS"
 *        ativo:
 *          type: boolean
 *          example: true
 *        portas:
 *          type: array
 *          example: [ { _id: "63759607e0a9fb91607a8c6d" } ]
 *    
 *    GrupoPortasSemId:
 *      type: object
 *      properties:
 *        nome:
 *          type: string
 *          example: "Professores ADS"
 *        descricao:
 *          type: string
 *          example: "Grupo de professores do ADS"
 *        ativo:
 *          type: boolean
 *          example: true
 *        portas:
 *          type: array
 *          example: [ { _id: "63759607e0a9fb91607a8c6d" } ]
 *    
 *    Login:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          example: "dev@gmail.com"
 *        senha:
 *          type: string
 *          example: "a1wksq12142s123"
 *    
 *    LoginResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2E4ZDZiYWNhNzQxNjJiZTYxNjY3NiIsIm5vbWUiOiJtYXRldXMgb2xpdmVpcmEiLCJlbWFpbCI6ImRldkBnbWFpbC5jb20iLCJhdGl2byI6dHJ1ZSwiaWF0IjoxNjg3MTg4MzI1LCJleHAiOjE2ODcxODg2MjV9.NG-FiXDKKWke_pY0h0Bhczzc8DA24jlVCbYX2zINz3w"
 *        user:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              example: '647a8d6baca74162be616676'
 *            nome:
 *              type: string
 *              example: 'Barba Negra'
 *            email:
 *              type: string
 *              example: "barbanegra@gmail.com"
 *            ativo:
 *              type: boolean
 *              example: true
 *            rotas:
 *              type: array
 *              example: [ {  _id: "63759607e0a9fb91607a8c6d", rota: "barba negra", dominio: "localhost", ativo: true, verbo_get: true, verbo_post: true, verbo_patch: true, verbo_put: true, verbo_delete: true } ]
 *            grupoPortas:
 *              type: array
 *              example: [ { _id: "63759607e0a9fb91607a8c6d", nome: "Professores ADS", descricao: "Grupo de portas dos professores de ADS", ativo: true, portas: [ _id: "63759607e0a9fb91607a8c6d" ] } ]
 *            grupoUsuarios:
 *              type: array
 *              example: [ { _id: "63759607e0a9fb91607a8c6d", nome: "CAED", descricao: "Grupo destinado aos funcionários da CAED para acessar o sistema", ativo: true, rotas: [ { _id: "63759607e0a9fb91607a8c6d", rota: "barba negra", dominio: "localhost", ativo: true, verbo_get: true, verbo_post: true, verbo_patch: true, verbo_put: true, verbo_delete: true } ]} ]
 *              
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
    login,
    enviarEmail
  )

}

export default routes;