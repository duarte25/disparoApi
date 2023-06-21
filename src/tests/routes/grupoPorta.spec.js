import { describe, expect, it, beforeEach, afterAll, afterEach } from '@jest/globals';
import request from "supertest";
import app from "../../app.js";
import mongoose from 'mongoose';

let server;
let token;

describe("Testes de integração da model GrupoPorta", () => {
  let id;
  beforeEach(() => {
    const port = 3006;
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

    expect(dados._body.user.nome).toEqual("Dev oliveira");
    expect(token).toEqual(dados._body.token);

  })

  it("Deve retornar uma lista vazia de grupos de porta", async () => {
    const response = await request(app).get('/grupoPortas')
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.docs[0].nome).toEqual("Professores ADS");
  });

  it("Deve criar um novo grupo de porta", async () => {
    const novoGrupoPorta = {
      nome: "Grupo Teste",
      descricao: "Descrição do Grupo Teste",
      ativo: true,
      portas: [],
      aberto: false,
    };

    const response = await request(app).post('/grupoPortas').send(novoGrupoPorta)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe(novoGrupoPorta.nome);
    id = response.body._id;
    expect(response.body.descricao).toBe(novoGrupoPorta.descricao);
    expect(response.body.ativo).toBe(novoGrupoPorta.ativo);
    expect(response.body.portas).toEqual(novoGrupoPorta.portas);
    expect(response.body.aberto).toBe(novoGrupoPorta.aberto);
  });

  it("Deve retornar um erro ao criar um grupo de porta sem nome", async () => {
    const novoGrupoPorta = {
      descricao: "Descrição do Grupo Teste",
      ativo: true,
      portas: [],
      aberto: false,
    };

    const response = await request(app).post('/grupoPortas').send(novoGrupoPorta)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("grupoPortas validation failed: nome: Nome é obrigatório");
  });

  it("Deve retornar um grupo de porta específico", async () => {
    // Suponha que já exista um grupo de porta com ID válido no banco de dados
    const grupoPortaId = id;

    const response = await request(app).get(`/grupoPortas/${grupoPortaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', grupoPortaId);
  });

  it("Deve retornar um erro ao buscar um grupo de porta com ID inválido", async () => {
    const grupoPortaId = "invalidId";

    const response = await request(app).get(`/grupoPortas/${grupoPortaId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("ID inválido!");
  });

  it("Deve atualizar um grupo de porta existente", async () => {
    // Suponha que já exista um grupo de porta com ID válido no banco de dados
    const grupoPortaId = id;
    const dadosAtualizados = {
      nome: "Grupo Atualizado",
      descricao: "Nova descrição do grupo",
      ativo: true,
      portas: [],
      aberto: true,
    };

    const response = await request(app).put(`/grupoPortas/${grupoPortaId}`).send(dadosAtualizados)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Grupo Porta atualizada com sucesso");
  });

  it("Deve retornar um erro ao atualizar um grupo de porta com ID inválido", async () => {
    const dadosAtualizados = {
      nome: "Grupo Atualizado",
      descricao: "Nova descrição do grupo",
      ativo: true,
      portas: [],
      aberto: true,
    };

    const response = await request(app).put(`/grupoPortas/34345343ffgtgr33`).send(dadosAtualizados)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro ao atualizar Grupo Porta - Cast to ObjectId failed for value \"34345343ffgtgr33\" (type string) at path \"_id\" for model \"grupoPortas\"");
  });

  it("Deve excluir um grupo de porta existente", async () => {
    // Suponha que já exista um grupo de porta com ID válido no banco de dados
    const grupoPortaId = id;

    const response = await request(app).delete(`/grupoPortas/${grupoPortaId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Grupo Porta deletado com sucesso");
  });

  it("Deve retornar um erro ao excluir um grupo de porta com ID inválido", async () => {
    const grupoPortaId = "invalidId";

    const response = await request(app).delete(`/grupoPortas/${grupoPortaId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro ao deletar o Grupo Porta");
  });
});
