import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import request from "supertest";
import app from "../../app.js";
import mongoose from 'mongoose';

describe("Testes de integração da model Rota", () => {

  let server;
  let token;

  beforeEach(() => {
    const port = 3077;
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

  it("Deve retornar uma rota válida vinda do banco de dados", async () => {
    const dados = await request(app)
      .get("/rotas")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
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
      .set("Authorization", `Bearer ${token}`)
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
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(400);
      expect(dados._body.message).toEqual("rotas validation failed: rota: Rota é obrigatório")
  })

  let id;

  it("Deve retornar uma busca no banco de dados feito pelo nome da rota mateus", async () => {
    const dados = await request(app)
      .get("/rotas?rota=mateus")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    id = dados._body.docs[0]._id;
  })

  it("Deve realizar uma busca por id da rota mateus", async () => {
    const dados = await request(app)
      .get(`/rotas/${id}`)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
      expect(dados._body.rota).toEqual("mateus")
  })

  it("Deve retornar um erro com código 404, pois passo um ID que não está no banco", async () => {
    const dados = await request(app)
      .get("/rotas/645e59a2b784101422b30590")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
      expect(dados._body.message).toEqual("Rota não encontrada")
  })

  it("Deve retornar um erro com código 400, pois passo um ID inválido", async () => {
    const dados = await request(app)
      .get("/rotas/645e59a2b78124512353sdfsd")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
      expect(dados._body.message).toEqual("ID inválido")
  })

  it("Deve atualizar a rota mateus utilizando o verbo PATCH, onde passará a ser moraes", async () => {
    const body = {
      rota: "moraes",
    }
    const dados = await request(app)
      .patch("/rotas/" + id)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(200);
      expect(dados._body.message).toEqual("Rota atualizada com sucesso")
  })

  it("Deve atualizar a rota mateus utilizando o verbo PUT, onde passará a ter somente o atributo rota", async () => {
    const body = {
      rota: "moraes",
    }
    const dados = await request(app)
      .put("/rotas/" + id)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(200);
      expect(dados._body.message).toEqual("Rota atualizada com sucesso")
  })

  it("Deve retonar um erro com código 400, pois passo um id inválido no patch", async () => {
    const body = {
      rota: "moraes",
    }
    const dados = await request(app)
      .patch("/rotas/rsdgsdr12341asad")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(400);
      //console.log(dados._body)
      //expect(dados._body.message).toEqual("Rota atualizada com sucesso")
  })


  it("Deve deletar a rota moraes", async () => {
    const dados = await request(app)
      .delete("/rotas/" + id)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
      expect(dados._body.message).toEqual("Rota deletada com sucesso")
  })
})