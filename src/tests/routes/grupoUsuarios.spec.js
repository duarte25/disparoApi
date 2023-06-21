import { describe, expect, it, beforeEach, afterAll, afterEach } from '@jest/globals';
import request from "supertest";
import app from "../../app.js";
import mongoose from 'mongoose';

let server;
let token;
let id;

describe("Testes de integração da model GrupoUsuario", () => {
  beforeEach(() => {
    const port = 3005;
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

  it("Deve retornar um grupo de usuário válido", async () => {
    const response = await request(app).get('/grupoUsuarios')
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.docs[0].nome).toEqual("Administrador");
  });

  it("Deve retornar uma busca em grupo de usuários passando a query nome", async () => {
    const response = await request(app).get('/grupoUsuarios?nome=Administrador')
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.docs[0].nome).toEqual("Administrador");
  })

  it("Deve criar um novo grupo de Usuario", async () => {
    const novoGrupoUsuario = {
      nome: "Grupo Teste",
      descricao: "Descrição do Grupo Teste",
      ativo: true,
      rotas: []
    };

    const response = await request(app).post('/grupoUsuarios').send(novoGrupoUsuario)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe(novoGrupoUsuario.nome);
    id = response.body._id;
    expect(response.body.descricao).toBe(novoGrupoUsuario.descricao);
    expect(response.body.ativo).toBe(novoGrupoUsuario.ativo);
    expect(response.body.rotas).toEqual(novoGrupoUsuario.rotas);
  });

  it("Deve retornar um erro ao criar um grupo de Usuario sem nome", async () => {
    const novoGrupoUsuario = {
      descricao: "Descrição do Grupo Teste",
      ativo: true,
      rotas: []

    };

    const response = await request(app).post('/grupoUsuarios').send(novoGrupoUsuario)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("grupoUsuarios validation failed: nome: Nome é obrigatório");
  });

  it("Deve retornar um grupo de Usuario específico", async () => {
    // Suponha que já exista um grupo de Usuario com ID válido no banco de dados
    const response = await request(app).get(`/grupoUsuarios/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', id);
  });

  it("Deve retornar um erro ao buscar um grupo de Usuario com ID inválido", async () => {
    const response = await request(app).get(`/grupoUsuarios/hghgdfgdsg232rasdf`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("ID inválido");
  });

  it("Deve atualizar um grupo de Usuario existente", async () => {
    // Suponha que já exista um grupo de Usuario com ID válido no banco de dados
    const dadosAtualizados = {
      nome: "Grupo Atualizado",
      descricao: "Nova descrição do grupo",
      ativo: true,
      Usuarios: [],
      aberto: true,
    };

    const response = await request(app).put(`/grupoUsuarios/${id}`).send(dadosAtualizados)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Grupo de Usuário atualizado com sucesso");
  });

  it("Deve retornar um erro ao atualizar um grupo de Usuario com ID inválido", async () => {
    const dadosAtualizados = {
      nome: "Grupo Atualizado",
      descricao: "Nova descrição do grupo",
      ativo: true,
      rotas: [],
    };

    const response = await request(app).put(`/grupoUsuarios/34345343ffgtgr33`).send(dadosAtualizados)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro ao atualizar grupo de usuário - Cast to ObjectId failed for value \"34345343ffgtgr33\" (type string) at path \"_id\" for model \"grupoUsuarios\"");
  });

  it("Deve excluir um grupo de Usuario existente", async () => {
    // Suponha que já exista um grupo de Usuario com ID válido no banco de dados
    const response = await request(app).delete(`/grupoUsuarios/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Grupo de Usuário deletado com sucesso");
  });

  it("Deve retornar um erro ao excluir um grupo de Usuario com ID inválido", async () => {
    const response = await request(app).delete(`/grupoUsuarios/asdsafasdsafasdas`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Erro ao deletar Grupo de Usuario - Cast to ObjectId failed for value \"asdsafasdsafasdas\" (type string) at path \"_id\" for model \"grupoUsuarios\"");
  });
});