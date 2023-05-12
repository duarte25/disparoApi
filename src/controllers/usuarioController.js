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
          user.docs[i].grupoPortas = await grupoPortas.find({ _id: { $in: user.docs[i].grupoPortas } }).lean();
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
}