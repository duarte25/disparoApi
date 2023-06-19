const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API - Fechadura Inteligente",
      description: "API para gerênciar fechaduras e usuários",
      version: "0.0.1",
      termsOfService: "http://localhost:3037",
      contact: {
        name: "FSLab",
        email: "fslab@fslab.dev",
        url: "https://www.fslab.dev"
      },
      license: {
        name: "Licença GPLv3",
        url: "http://www.gnu.org/licenses/gpl-3.0.html"
      },
    },
    externalDocs: {
      description: "Documentação detalhada",
      url: "https://gitlab.fslab.dev/fs-ii-turma-2022-fechadura/fechadura-back-end"
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "API Fechadura Inteligente - Turma 2022"
      }
    ],
    tags: [
      {
        name: "Login",
        description: "Login do usuário"
      },
      {
        name: "Usuarios",
        description: "Usuários do sistema"
      },
      {
        name: "Portas",
        description: "Portas do sistema"
      },
      {
        name: "Rotas",
        description: "Rotas do sistema"
      },
      {
        name: "Grupo de Usuarios",
        description: "Grupo de usuários do sistema"
      },
      {
        name: "Grupo de Portas",
        description: "Grupo de portas do sistema"
      }
    ],
    paths: {},
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

export default swaggerOptions;