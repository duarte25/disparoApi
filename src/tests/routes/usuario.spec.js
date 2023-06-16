import { describe, expect, it, beforeEach, afterAll, afterEach } from '@jest/globals';
import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';

let server;
let token;

describe("Teste de integração da model Usuário", () => {
  beforeEach(() => {
    const port = 3022;
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

  it("Deve retornar um usuário válido vindo do banco de dados", async () => {
    const dados = await request(app)
      .get("/usuarios")
      .accept("Content-Type", "application/json")
      .expect(200)
      .set("Authorization", `Bearer ${token}`)

    expect(dados._body.docs[0].nome).toEqual("mateus oliveira")

  })
  let idusuario;
  it("Deve cadastrar um usuário no banco de dados", async () => {
    const body = {
      nome: "Lucineia",
      email: "lucineia2705@gmail.com",
      senha: "12345678",
      link_foto: "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
      ativo: true,
      digital: [],
      rotas: [],
      grupoPortas: [],
      grupoUsuarios: []
    }
    const dados = await request(app)
      .post("/usuarios")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(201);

    //console.log(dados._body)

    idusuario = dados._body._id


  })

  it("Deve retornar um erro pois não está sendo passado um campo obrigatório (nome)", async () => {
    const body = {

      email: "lucineia447@gmail.com",
      senha: "12345678",
      link_foto: "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
      ativo: true,
      rfid: " ",
      iris: " ",
      digital: [{ digital: " "}],
    }
    const dados = await request(app)
      .post("/usuarios")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(400);
    expect(dados._body.message).toEqual("usuarios validation failed: nome: Nome é obrigatório.")
  })

  let id;

  it("Deve retornar uma busca no banco de dados feito pelo nome da usuário lucineia", async () => {
    const dados = await request(app)
      .get("/usuarios?usuario=lucineia")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(dados.body.docs.length).toBeGreaterThanOrEqual(1)

    id = dados._body.docs[0]._id;
  })

  it("Deve realizar uma busca por id do usuário lucineia", async () => {
    const dados = await request(app)
      .get(`/usuarios/${idusuario}`)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(dados.body.nome).toEqual("Lucineia")
  })

  it("Deve retornar um erro com código 404, pois passo um ID que não está no banco", async () => {
    const dados = await request(app)
      .get("/usuários/645e59a2b784101422b30590")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(404);

  })

  it("Deve retornar um erro com código 400, pois passo um ID inválido", async () => {
    const dados = await request(app)
      .get("/usuarios/645e59a2b78124512353sdfsd")
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
    expect(400);
    expect(dados._body.message).toEqual("Id inválido")
  })
  it("Deve atualizar o usuário lucineia utilizando o verbo PATCH, onde passará a ser pacheco", async () => {
    const body = {
      usuario: "pacheco",
    }
    const dados = await request(app)
      .patch("/usuarios/" + id)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(200)
    expect(dados._body.message).toEqual("Usuário atualizado com sucesso")
  })

  it("Deve atualizar o usuário lucineia utilizando o verbo PUT, onde passará a ter somente o atributo n", async () => {
    const body = {
      usuario: "pacheco",
    }
    const dados = await request(app)
      .put(`/usuarios/${idusuario}`)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
    expect(200);

  })
  it("Deve retonar um erro com código 400, pois passo um id inválido no patch", async () => {
    const body = {
      usuario: "lucineia",

    }
    const dados = await request(app)
      .patch(`/usuarios/1155515151515151555`)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(body)
      .expect(400)

  })

  it("Deve deletar o usuario lucineia", async () => {
    const dados = await request(app)
      .delete(`/usuarios/${idusuario}`)
      .accept("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    expect(dados._body.message).toEqual("Usuário deletado com sucesso")
  })
})
