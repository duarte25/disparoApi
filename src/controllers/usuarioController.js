import usuarios from "../models/Usuario.js";
import grupoUsuario from "../models/GrupoUsuario.js";
import grupoPorta from "../models/GrupoPorta.js";
import AuthPermission from "../middlewares/AuthPermission.js"
import enviaemail from "./enviaremailController.js"
import SendMail from '../utils/SendMail.js';

export default class UsuarioController {
  static listarUsuarios = async (req, res) => {
    try {
      if (await AuthPermission.verifyPermission("usuarios", "get", req, res) !== false) {
        return;
      }
      const nome = req.query.nome;
      const page = req.query.page;
      const perPage = req.query.perPage;

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      };

      if (nome) {
        const usuario = await usuarios.paginate({ nome: new RegExp(nome, 'i') }, options);
        let user = JSON.parse(JSON.stringify(usuario));

        for (let i = 0; i < user.docs.length; i++) {
          user.docs[i].grupoUsuarios = await grupoUsuario.find({ _id: { $in: user.docs[i].grupoUsuarios } }).lean();
        }

        for (let i = 0; i < user.docs.length; i++) {
          user.docs[i].grupoPortas = await grupoPorta.find({ _id: { $in: user.docs[i].grupoPortas } }).lean();
        }

        return res.status(200).json(user);
      } else {
        const usuario = await usuarios.paginate({}, options);
        let user = JSON.parse(JSON.stringify(usuario));

        for (let i = 0; i < user.docs.length; i++) {
          user.docs[i].grupoUsuarios = await grupoUsuario.find({ _id: { $in: user.docs[i].grupoUsuarios } }).lean();
        }

        for (let i = 0; i < user.docs.length; i++) {
          user.docs[i].grupoPortas = await grupoPorta.find({ _id: { $in: user.docs[i].grupoPortas } }).lean();
        }

        return res.status(200).json(user);
      }

    }
    catch (error) {
      console.log(error)
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static listarUsuarioPorId = async (req, res) => {
    try {
      if (await AuthPermission.verifyPermission("usuarios:id", "get", req, res) !== false) {
        return;
      }
      const id = req.params.id;

      await usuarios.findById(id).then((usuario) => {
        if (usuario) {
          return res.status(200).send(usuario.toJSON())

        } else {
          return res.status(404).json({ error: true, code: 404, message: "Usuário não encontrado" })
        }
      }).catch((error) => {
        return res.status(400).json({ error: true, code: 400, message: "Id inválido" })
      })


    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  //CADASTAR USUARIO ----------------------------------------------------------------------------------------------
  static cadastrarUsuario = async (req, res) => {
    try {
      if (await AuthPermission.verifyPermission("usuarios", "post", req, res) !== false) {
        return;
      }
      const usuario = new usuarios(req.body);

      const userExist = await usuarios.findOne({ email: req.body.email });

      if (userExist) {
        return res.status(400).json({ code: 400, message: "E-mail já cadastrado!" })
      }

      // desativar o usuario


      // cria função para gerar um código aleatório de 4 caracteres maiúsculos
      async function geraCodigo() {
        let codigo = "";
        let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*()0123456789";
        for (let i = 0; i < 4; i++) {
          codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return codigo;
      }

      const codigoAtivacao = await geraCodigo()

      usuario.ativo = false;
      usuario.codigo_confirma_email = codigoAtivacao;

      await usuario.save().then((usuario) => {
        // enviar email de confirmação de cadastro
        const infoEmail = {}
        infoEmail.to = usuario.email;
        infoEmail.subject = "Envio do código para confirmação de cadastro";
        infoEmail.text = "Olá " + usuario.nome + ",\n\n" + "Seu código de confirmação de cadastro é: " + usuario.codigo_confirma_email + "\n\n" + "Atenciosamente,\n" + "Equipe de suporte";
        infoEmail.html = "<p>Olá " + usuario.nome + ",</p><p>Seu código de confirmação de cadastro é: <strong>" + usuario.codigo_confirma_email + "</strong></p><p>Atenciosamente,</p><p>Equipe de suporte</p>";

        enviaemail(infoEmail);

        return res.status(201).send(usuario.toJSON());
      }).catch((error) => {
        return res.status(400).json({ message: error.message });
      })
    } catch (error) {
      SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
      return res.status(500).json({ code: 500, message: err.message });
    }
  }

  static atualizarPatch = async (req, res) => {
    try {
      if (await AuthPermission.verifyPermission("usuarios:id", "patch", req, res) !== false) {
        return;
      }
      const id = req.params.id;
      const corpo = req.body;

      await usuarios.findByIdAndUpdate(id, corpo).then(() => {
        if (Object.keys(corpo).length < 1) {
          return res.status({ message: "Nenhum dado a ser atualizado" })
        } else {
          return res.status(200).json({ message: "Usuário atualizado com sucesso" })
        }
      }).catch((error) => {
        return res.status(400).json({ message: `Erro ao atualizar usuário - ${error.message}` })

      })

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static atualizarPut = async (req, res) => {
    try {
      if (await AuthPermission.verifyPermission("usuarios:id", "put", req, res) !== false) {
        return;
      }
      const id = req.params.id;
      const corpo = req.body;

      await usuarios.findByOneAndReplace({ _id: id }, corpo, { omitUndefined: false }).then((usuario) => {
        if (Object.keys(corpo).length < 1) {
          return res.status({ message: "Nenhum dado a ser atualizado" })
        } else {
          return res.status(200).json({ message: "Usuário atualizado com sucesso" })
        }
      }).catch((error) => {
        return res.status(400).json({ message: `Erro ao atualizar usuário - ${error.message}` })
      })

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }


  static deletarUsuario = async (req, res) => {
    try {
      if (await AuthPermission.verifyPermission("usuarios:id", "delete", req, res) !== false) {
        return;
      }
      const id = req.params.id;

      await usuarios.findByIdAndDelete(id).then((usuario) => {
        return res.status(200).json({ message: "Usuário deletado com sucesso" })
      }).catch((error) => {
        return res.status(400).json({ message: `Erro ao deletar usuario ${error.message}` })
      })

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

}