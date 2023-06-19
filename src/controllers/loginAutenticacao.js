import Usuario from "../models/Usuario.js";
import grupoUsuarios from "../models/GrupoUsuario.js";
import grupoPortas from "../models/GrupoPorta.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export default class LoginController {
  static autenticar = async (req, res) => {
    try {
      const { email, senha } = req.body;

      const userExist = await Usuario.findOne({ email }).select('+senha');

      if (!userExist || !await bcrypt.compare(senha, userExist.senha)) {
        return res.status(400).json([{ code: 400, message: "Usuário ou Senha inválida!" }])
      }

      if (!userExist.ativo) {
        return res.status(403).json([{ code: 403, message: "Usuário inativo!" }])
      }

      const user = JSON.parse(JSON.stringify(userExist));

      user.grupoUsuarios = await grupoUsuarios.find({ _id: { $in: user.grupoUsuarios } }).lean();
      user.grupoPortas = await grupoPortas.find({ _id: { $in: user.grupoPortas } }).lean();

      return res.status(200).json({
        token: jwt.sign({
          id: userExist.id,
          nome: userExist.nome,
          email: userExist.email,
          ativo: userExist.ativo
        }, process.env.SECRET, { expiresIn: process.env.EXPIREIN }),
        user: {
          id: userExist._id,
          nome: userExist.nome,
          email: userExist.email,
          ativo: userExist.ativo,
          rotas: userExist.rotas,
          grupoUsuarios: user.grupoUsuarios,
          grupoPortas: user.grupoPortas
        }
      })
    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }
}