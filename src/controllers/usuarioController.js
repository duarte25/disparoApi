import usuarios from "../models/Usuario.js";
import grupoUsuario from "../models/GrupoUsuario.js";
import grupoPorta from "../models/GrupoPorta.js";

export default class UsuarioController {
  static listarUsuarios = async (req, res) => {
    try {
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
      }

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
    catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static listarUsuarioPorId = async (req, res) => {
    try {
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

  static cadastrarUsuario = async (req, res) => {
    try {
      const usuario = new usuarios(req.body);

      await usuario.save().then((usuario) => {
        return res.status(201).send(usuario.toJSON());

      }).catch((error) => {
        return res.status(400).json({ message: error.message });
      })

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static atualizarPatch = async (req, res) => {
    try {
      const id = req.params.id;
      const corpo = req.body;

      await usuarios.findByIdAndUpdate(id, corpo).then(() => {
        if (Object.keys(corpo).length < 1) {
          return res.status({ message: "Nenhum dado a ser atualizado" })
        }
        return res.status(200).json({ message: "Usuário atualizado com sucesso" })

      }).catch((error) => {
        return res.status(400).json({ message: `Erro ao atualizar usuário - ${error.message}` })

      })

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static atualizarPut = async (req, res) => {
    try {
      const id = req.params.id;
      const corpo = req.body;

      await usuarios.findByOneAndReplace({ _id: id }, corpo, { omitUndefined: false }).then((usuario) => {
        if (Object.keys(corpo).length < 1) {
          return res.status({ message: "Nenhum dado a ser atualizado" })
        }
        return res.status(200).json({ message: "Usuário atualizado com sucesso" })
      }).catch((error) => {
        return res.status(400).json({ message: `Erro ao atualizar usuário - ${error.message}` })
      })

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }


  static deletarUsuario = async (req, res) => {
    try {
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