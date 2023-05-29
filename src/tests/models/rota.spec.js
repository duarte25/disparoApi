import { describe, it, jest } from "@jest/globals";

describe("Deve retornar um teste", () => {
  it("Teste para testar", () => {
    let a = 1;
    expect(a).toEqual(1);
  })
})