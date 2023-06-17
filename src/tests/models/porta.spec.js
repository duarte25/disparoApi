import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals";
import Porta from "../../models/Porta.js";
import portaController from "../../controllers/portaController.js";

describe("Deve retornar testes de unidade de porta", () => {

  afterEach(() => jest.clearAllMocks());

  it("Deve retornar verdadeiro ao cadastrar uma porta e compara-la com o metodo direto do controller", () => {
    const body = {
      descricao: "ADM",
      ambiente: "Secretaria",
      ativo: true
    }

    const portaInstancia = new Porta(body);

    portaController.cadastrarPorta = jest.fn().mockReturnValue({
      descricao: "ADM",
      ambiente: "Secretaria",
      ativo: true
    })

    const retorno = portaController.cadastrarPorta();
    expect(retorno.porta).toEqual(portaInstancia.porta)
  })

  it("Deve retonar uma lista de portas", () => {
    const listaPortas = [
      {
        descricao: "CIT",
        ambiente: "digital Tocantins Orquestrador",
        ativo: true
      },
      {
        descricao: "FSLab",
        ambiente: "port Supervisor",
        ativo: true
      },
      {
        descricao: "ADM",
        ambiente: "Secretaria",
        ativo: true
      }
    ];

    portaController.listarPortas = jest.fn().mockReturnValue(listaPortas);

    const retorno = portaController.listarPortas();
    expect(retorno[0]).toHaveProperty[""]
  })

  it("Deve retornar a porta ao busca-la por ID", () => {
    const portaId = {
      descricao: "ADM",
      ambiente: "Direcao",
      ativo: true
    }

    portaController.listarPorId = jest.fn().mockReturnValue(portaId)

    const retorno = portaController.listarPorId();
    expect(retorno.ambiente).toEqual("Direcao")
  })
})
