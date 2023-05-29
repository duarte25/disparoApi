import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import request from "supertest";
import app from "../../app.js";
import mongoose from 'mongoose';

let server;

describe("Testes de integração da model Rota", () => {
  beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
  });

  afterEach(() => {
    server.close();
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it("Deve retornar uma rota válida vinda do banco de dados", async () => {
    const dados = await request(app)
      .get("/rotas")
      .accept("Content-Type", "application/json")
      .expect(200);
    //console.log(dados._body.docs[0])
    expect(dados._body.docs[0].rota).toEqual("rotas");
  })

  it("Deve cadastrar uma rota no banco de dados", async () => {
    const body = {
      rota: "mateus",
      dominio: "localhost",
      ativo: true,
      verbo_get: true,
      verbo_post: true,
      verbo_patch: true,
      verbo_delete: true,
      verbo_put: true
    }
    const dados = await request(app)
      .post("/rotas")
      .accept("Content-Type", "application/json")
      .send(body)
      .expect(201);
    //console.log(dados._body.docs[0])
  })

  it("Deve retornar um erro pois não está sendo passado um campo obrigatório", async () => {
    const body = {
      dominio: "localhost",
      ativo: true,
      verbo_get: true,
      verbo_post: true,
      verbo_patch: true,
      verbo_delete: true,
      verbo_put: true
    }
    const dados = await request(app)
      .post("/rotas")
      .accept("Content-Type", "application/json")
      .send(body)
      .expect(400);
    //console.log(dados._body.docs[0])
  })

  let id;

  it("Deve retornar uma busca no banco de dados feito pelo nome da rota mateus", async () => {
    const dados = await request(app)
      .get("/rotas?rota=mateus")
      .accept("Content-Type", "application/json")
      .expect(200);

    id = dados._body.docs[0]._id;
  })

  it("Deve realizar uma busca por id da rota mateus", async () => {
    const dados = await request(app)
      .get("/rotas/" + id)
      .accept("Content-Type", "application/json")
      .expect(200);
  })

  it("Deve atualizar a rota mateus, onde passará a ser moraes", async () => {
    const body = {
      rota: "moraes",
    }
    const dados = await request(app)
      .patch("/rotas/" + id)
      .accept("Content-Type", "application/json")
      .send(body)
      .expect(200);
  })

  it("Deve deletar a rota moraes", async () => {
    const dados = await request(app)
      .delete("/rotas/" + id)
      .accept("Content-Type", "application/json")
      .expect(200);
  })
})