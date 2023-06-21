import { describe, expect, it, jest, beforeEach, afterEach } from "@jest/globals";
import GrupoUsuario from "../../models/GrupoUsuario.js";
import GrupoUsuarioController from "../../controllers/grupoUsuarioController.js";

describe("Testes unitários do modelo Grupo Usuario", () => {

  afterEach(() => jest.clearAllMocks());

  it("Deve retornar verdadeiro ao cadastrar um grupo de Usuario e compará-lo com o método direto do controller", () => {
    const novoGrupoUsuario = {
      nome: "Grupo Teste",
      descricao: "Descrição do Grupo Teste",
      ativo: true,
      rotas: []
    };

    const grupoUsuarioInstancia = new GrupoUsuario(novoGrupoUsuario);

    GrupoUsuarioController.cadastrarGrupoUsuario = jest.fn().mockReturnValue(novoGrupoUsuario);

    const retorno = GrupoUsuarioController.cadastrarGrupoUsuario();
    expect(retorno.nome).toEqual(grupoUsuarioInstancia.nome);
  });

  it("Deve retornar uma lista de grupos de Usuario", () => {
    const listaGrupoUsuarios = [
      {
        nome: "Grupo 1",
        descricao: "Descrição do Grupo 1",
        ativo: true,
        rotas: [],
      },
      {
        nome: "Grupo 2",
        descricao: "Descrição do Grupo 2",
        ativo: true,
        rotas: [],
      },
      {
        nome: "Grupo 3",
        descricao: "Descrição do Grupo 3",
        ativo: true,
        rotas: [],
      },
    ];

    GrupoUsuarioController.listarGrupoUsuarios = jest.fn().mockReturnValue(listaGrupoUsuarios);

    const retorno = GrupoUsuarioController.listarGrupoUsuarios();
    expect(retorno[0]).toHaveProperty("nome", "Grupo 1");
  });

  it("Deve retornar um grupo de Usuario ao buscá-lo por ID", () => {
    const grupoUsuarioId = {
      nome: "Grupo Teste",
      descricao: "Descrição do Grupo Teste",
      ativo: true,
      rotas: []
    };

    GrupoUsuarioController.listarPorId = jest.fn().mockReturnValue(grupoUsuarioId);

    const retorno = GrupoUsuarioController.listarPorId();
    expect(retorno.nome).toEqual("Grupo Teste");
  });
});