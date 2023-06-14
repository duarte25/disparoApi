import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import request from "supertest";
import app from "../../app.js";
import mongoose from 'mongoose';

describe("Testes na rota de login da aplicação ", () => {

  let server;
  let token;

  beforeEach(() => {
    const port = 3079;
    server = app.listen(port);
  });

  afterEach(() => {
    server.close();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it("Deve retornar um usuário válido e o status 200 após realizar o login na aplicação", async () => {
    const dados = await request(app)
    .post("/login")
    .accept("Content-Type", "application/json")
    .send({
      email: "dev@gmail.com",
      senha: "123"
    })
    .expect(200);

    token = dados._body.token;
  
  expect(dados._body.user.nome).toEqual("mateus oliveira");
  expect(token).toEqual(dados._body.token);
  })
})