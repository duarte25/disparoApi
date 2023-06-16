import { describe, expect, it, jest, afterAll, afterEach, beforeEach } from "@jest/globals";
import Usuario from "../../models/Usuario.js";
import UsuarioController from "../../controllers/usuarioController.js";

describe("Deve retornar testes de unidade de usuario", () => {

  afterEach(() => jest.clearAllMocks());

  it("Deve retornar verdadeiro ao cadastrar usuário e comparara-lo com o metodo direto do controller", () => {
    const body = {
      nome: "Lucineia",
      email: "lucineia447@gmail.com",
      senha: "12345678",
      link_foto: "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
      ativo: true,
      rfid: " ",
      iris: " ",
      digital: " "
    }

    const usuarioInstancia = new Usuario(body);

    UsuarioController.cadastrarUsuario = jest.fn().mockReturnValue({
      nome: "Lucineia",
      email: "lucineia447@gmail.com",
      senha: "12345678",
      link_foto: "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
      ativo: true,
      rfid: " ",
      iris: " ",
      digital: " ",
      rotas: [{}],
      grupoUsuarios: [{}],
      grupoPortas: [{}],
    })


    const retorno = UsuarioController.cadastrarUsuario();
    expect(retorno.usuarios).toEqual(usuarioInstancia.usuario)

  })

  it("Deve retornar uma lista de usuário cadastrados", () => {
    const listarUsuarios = [
      {
        nome: "Lucineia",
        email: "lucineia447@gmail.com",
        senha: "12345678",
        link_foto: "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
        ativo: true,
        rfid: " ",
        iris: " ",
        digital: " ",
      }
    ];

    UsuarioController.listarUsuarios = jest.fn().mockReturnValue(listarUsuarios);

    const retorno = UsuarioController.listarUsuarios();
    expect(retorno[0].nome).toEqual("Lucineia")

  })

  it("Deve retornar um usuário ao buscá-lo por ID", () => {
    const usuarioId = {

      nome: "Lucineia",
      email: "lucineia447@gmail.com",
      senha: "12345678",
      link_foto: "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
      ativo: true,
      rfid: " ",
      iris: " ",
      digital: " ",
    }
    UsuarioController.listarUsuarioPorId = jest.fn().mockReturnValue(usuarioId)

    const retorno = UsuarioController.listarUsuarioPorId();
    expect(retorno.nome).toEqual("Lucineia")

  })


  it("Deve atualizar algumas informações do usuário", () => {

    const patchUsuario = {

      nome: "Lucineia",
      email: "lucineia447@gmail.com",
      senha: "12345678",
      link_foto: "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
      ativo: true,
      rfid: " ",
      iris: " ",
      digital: " ",
    }
    UsuarioController.patchUsuario = jest.fn().mockReturnValue(patchUsuario)
    const retorno = UsuarioController.patchUsuario();
    expect(retorno.nome).toEqual("Lucineia")

  })
  it("Deve atualizar informações completas do usuário", () => {

    const putUsuario =
    {
      nome: "Lucineia",
      email: "lucineia447@gmail.com",
      senha: "12345678",
      link_foto: "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
      ativo: true,
      rfid: " ",
      iris: " ",
      digital: " ",

    }
    UsuarioController.putUsuario = jest.fn().mockReturnValue(putUsuario)
    const retorno = UsuarioController.putUsuario();
    expect(retorno.nome).toEqual("Lucineia")
  })
  it("Deve excluir usuário do cadastro", () => {

    const excluirUsuario = {

      nome: "Lucineia",
      email: "lucineia447@gmail.com",
      senha: "12345678",
      link_foto: "https://s3.amazonaws.com/uifaces/faces/twitter/sindresorhus/128.jpg",
      ativo: true,
      rfid: " ",
      iris: " ",
      digital: " ",

    }

    UsuarioController.excluirUsuario = jest.fn().mockReturnValue(excluirUsuario)
    const retorno = UsuarioController.excluirUsuario();
    expect(retorno.nome).toEqual("Lucineia")

  })
})
