import { describe, expect, it, jest, beforeEach, afterEach } from "@jest/globals";
import GrupoPorta from "../../models/GrupoPorta.js";
import GrupoPortaController from "../../controllers/grupoPortaController.js";

describe("Testes unitários do modelo Grupo Portas", () => {

  afterEach(() => jest.clearAllMocks());

  it("Deve retornar verdadeiro ao cadastrar um grupo de portas e compará-lo com o método direto do controller", () => {
    const novoGrupoPorta = {
      nome: "Grupo Teste",
      descricao: "Descrição do Grupo Teste",
      ativo: true,
      portas: [],
      aberto: false,
    };

    const grupoPortaInstancia = new GrupoPorta(novoGrupoPorta);

    GrupoPortaController.cadastrarGrupoPorta = jest.fn().mockReturnValue(novoGrupoPorta);

    const retorno = GrupoPortaController.cadastrarGrupoPorta();
    expect(retorno.nome).toEqual(grupoPortaInstancia.nome);
  });

  it("Deve retornar uma lista de grupos de portas", () => {
    const listaGruposPortas = [
      {
        nome: "Grupo 1",
        descricao: "Descrição do Grupo 1",
        ativo: true,
        portas: [],
        aberto: false,
      },
      {
        nome: "Grupo 2",
        descricao: "Descrição do Grupo 2",
        ativo: true,
        portas: [],
        aberto: false,
      },
      {
        nome: "Grupo 3",
        descricao: "Descrição do Grupo 3",
        ativo: true,
        portas: [],
        aberto: false,
      },
    ];

    GrupoPortaController.listarGruposPortas = jest.fn().mockReturnValue(listaGruposPortas);

    const retorno = GrupoPortaController.listarGruposPortas();
    expect(retorno[0]).toHaveProperty("nome", "Grupo 1");
  });

  it("Deve retornar um grupo de portas ao buscá-lo por ID", () => {
    const grupoPortaId = {
      nome: "Grupo Teste",
      descricao: "Descrição do Grupo Teste",
      ativo: true,
      portas: [],
      aberto: false,
    };

    GrupoPortaController.listarGrupoPortaPorId = jest.fn().mockReturnValue(grupoPortaId);

    const retorno = GrupoPortaController.listarGrupoPortaPorId();
    expect(retorno.nome).toEqual("Grupo Teste");
  });
});
