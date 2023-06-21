import { describe, expect, it, jest, beforeEach, afterEach } from "@jest/globals";
import GrupoUsuario from "../../models/GrupoUsuario.js";
import GrupoPortaController from "../../controllers/grupoUsuarioController.js";

describe("Testes unitários do modelo Grupo Usuario", () => {

  afterEach(() => jest.clearAllMocks());

  it("Deve retornar verdadeiro ao cadastrar um grupo de Usuario e compará-lo com o método direto do controller", () => {
    const novoGrupoPorta = {
      nome: "Grupo Teste",
      descricao: "Descrição do Grupo Teste",
      ativo: true,
      portas: [],
      aberto: false,
    };

    const grupoUsuarioInstancia = new GrupoUsuario (novoGrupoUsuario);

    GrupoPortaController.cadastrarGrupoUsuario = jest.fn().mockReturnValue(novoGrupoUsuario);

    const retorno = GrupoUsuarioController.cadastrarGrupoUsuario();
    expect(retorno.nome).toEqual(grupoUsuarioInstancia.nome);
  });

  it("Deve retornar uma lista de grupos de Usuario", () => {
    const listaGrupoUsuariov = [
      {
        nome: "Grupo 1",
        descricao: "Descrição do Grupo 1",
        ativo: true,
        Usuario: [],
        aberto: false,
      },
      {
        nome: "Grupo 2",
        descricao: "Descrição do Grupo 2",
        ativo: true,
        Usuario: [],
        aberto: false,
      },
      {
        nome: "Grupo 3",
        descricao: "Descrição do Grupo 3",
        ativo: true,
        Usuario: [],
        aberto: false,
      },
    ];

    GrupoUsuarioController.listarGrupoUsuario = jest.fn().mockReturnValue(listaGrupoUsuario);

    const retorno = GrupoUsuarioController.listarGruposUsuario();
    expect(retorno[0]).toHaveProperty("nome", "Grupo 1");
  });

  it("Deve retornar um grupo de Usuario ao buscá-lo por ID", () => {
    const grupoUsuarioId = {
      nome: "Grupo Teste",
      descricao: "Descrição do Grupo Teste",
      ativo: true,
      Usuario: [],
      aberto: false,
    };

    GrupoUsuarioController.listarGrupoUsuarioPorId = jest.fn().mockReturnValue(grupoUsuarioId);

    const retorno = GrupoUsuarioController.listarGrupoPortaPorId();
    expect(retorno.nome).toEqual("Grupo Teste");
  });
});