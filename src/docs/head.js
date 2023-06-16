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
      externalDocs: {
        description: "Documentação detalhada",
        url: "https://gitlab.fslab.dev/fs-ii-turma-2022-fechadura/fechadura-back-end"
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`,
          description: "API em desenvolvimento no FSLab - Turma 2022"
        }
      ],
      tags: [
        {
          name: "Login",
          description: "Login do usuário"
        },
        {
          name: "Usuarios",
          description: "Usuários cadastrados no sistema"
        },
        {
          name: "Portas",
          description: "Portas cadastradas no sistema"
        },
        {
          name: "Rotas",
          description: "Rotas cadastradas no sistema"
        },
        {
          name: "GrupoUsuarios",
          description: "Grupo de usuários cadastrados no sistema"
        },
        {
          name: "GrupoPortas",
          description: "Grupo de portas cadastrados no sistema"
        }
      ],
      paths: {},
      components: {
        securityShemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            in: "header"
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

export default swaggerOptions;