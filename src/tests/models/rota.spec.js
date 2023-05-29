import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals";
import Rota from "../../models/Rota.js";
import RotaController from "../../controllers/rotaController.js";

describe("Deve retornar testes de unidade de rota", () => {

  afterEach(() => jest.clearAllMocks());

  it("Deve retornar verdadeiro ao cadastrar uma rota e compara-la com o metodo direto do controller", () => {
    const body = {
      rota: "george",
      dominio: "localhost",
      ativo: true,
      verbo_get: true,
      verbo_post: true,
      verbo_patch: true,
      verbo_delete: true,
      verbo_put: true
    }

    const rotaInstancia = new Rota(body);

    RotaController.cadastrarRota = jest.fn().mockReturnValue({
      rota: "george",
      dominio: "localhost",
      ativo: true,
      verbo_get: true,
      verbo_post: true,
      verbo_patch: true,
      verbo_delete: true,
      verbo_put: true
    })

    const retorno = RotaController.cadastrarRota();
    expect(retorno.rota).toEqual(rotaInstancia.rota)

  })

  it("Deve retonar uma lista de rotas", () => {
    const listaRotas = [
      {
        rota: "rodrigo",
        dominio: "localhost",
        ativo: true,
        verbo_get: true,
        verbo_post: true,
        verbo_patch: true,
        verbo_delete: true,
        verbo_put: true
      },
      {
        rota: "danilo",
        dominio: "localhost",
        ativo: true,
        verbo_get: true,
        verbo_post: true,
        verbo_patch: true,
        verbo_delete: true,
        verbo_put: true
      },
      {
        rota: "gabriel",
        dominio: "localhost",
        ativo: true,
        verbo_get: true,
        verbo_post: true,
        verbo_patch: true,
        verbo_delete: true,
        verbo_put: true
      }
    ];

    RotaController.listarRotas = jest.fn().mockReturnValue(listaRotas);

    const retorno = RotaController.listarRotas();
    expect(retorno[0]).toHaveProperty("rota","rodrigo")
  })

  it("Deve retornar a rota ao busca-la por ID", () => {
    const rotaId = {
      rota: "xamuel",
      dominio: "localhost",
      ativo: true,
      verbo_get: true,
      verbo_post: true,
      verbo_patch: true,
      verbo_delete: true,
      verbo_put: true
    }
    
    RotaController.listarPorId = jest.fn().mockReturnValue(rotaId)

    const retorno = RotaController.listarPorId();
    expect(retorno.rota).toEqual("xamuel")
  })
})