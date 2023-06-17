import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import request from "supertest";
import app from "../../app.js";
import mongoose from 'mongoose';

let server;
let token;

describe("Testes de integração da model Porta", () => {
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

  it("Deve retornar uma porta válida do banco de dados", async () => {
    const dados = await request(app)
      .get("/portas")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
    //console.log(dados._body.doc[0])
    expect(dados._body.docs[0].ambiente).toEqual("digital Tocantins Orquestrador")
  })

  let idporta;
  it("Deve cadastrar uma porta no banco de dados", async () => {
    const body = {
      descricao: "ADM",
      ambiente: "Secretaria",
      ativo: true
    }
    const dados = await request(app)
      .post("/portas")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(201);
    //console.log(dados._body.docs[0])

    idporta = dados._body._id
  })

  it("Deve retornar um erro pois não está sendo passado um campo obrigatório", async () => {
    const body = {
      descricao: "",
      ambiente: "Secretaria",
      ativo: "true"
    }

    const dados = await request(app)
      .post("/portas")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(404)
    expect(dados._body.message).toEqual("portas validation failed: descricao: Path `descricao` is required.")
  })

  let id;

  it("Deve retornar uma busca no banco de dados feito pela descrição da porta Secretaria", async () => {
    const dados = await request(app)
      .get("/portas?porta=Secretaria")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    id = dados._body.docs[0]._id;
  })

  it("Deve realizar uma busca por id da porta Secretaria", async () => {
    const dados = await request(app)
      .get(`/portas/${idporta}`)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(dados.body.ambiente).toEqual("Secretaria")
  })

  it("Deve retornar um erro com código 404, pois passo um ID que não está no banco", async () => {
    const dados = await request(app)
      .get("/portas/647a8d6baca74162be610001")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);
    expect(dados._body.message).toEqual("Id da porta não localizado.")
  })

  it("Deve retornar um erro com código 400, pois passo um ID inválido", async () => {
    const dados = await request(app)
      .get("/portas/645e59a2b78124512353sdfsd")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
    expect(dados._body.message).toEqual("id invalido")
  })

  it("Deve atualizar a porta Secretaria utilizando o verbo PATCH, onde passará a ser gold", async () => {
    const body = {
      porta: "gold",
    }
    const dados = await request(app)
      .patch(`/portas/${idporta}`)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(200)
    expect(dados._body.message).toEqual("Porta atualizada com sucesso")
  })

  it("Deve atualizar a porta Secretaria utilizando o verbo PUT, onde passará a ter somente o atributo ambiente", async () => {
    const body = {
      porta: "Secretaria",
    }
    const dados = await request(app)
      .put(`/portas/${idporta}`)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(200);
    expect(dados._body.message).toEqual("Porta atualizada com sucesso")
  })

  it("Deve retonar um erro com código 400, pois passo um id inválido no patch", async () => {
    const body = {
      porta: "Secretaria",
    }
    const dados = await request(app)
      .patch("/portas/rsdgsdr12341asad")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(400);
    //console.log(dados._body)
    //expect(dados._body.message).toEqual("Porta atualizada com sucesso")
  })


  it("Deve deletar a porta Secretaria", async () => {
    const dados = await request(app)
      .delete(`/portas/${idporta}`)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(dados._body.message).toEqual("Porta deletada com sucesso")
  })

})
