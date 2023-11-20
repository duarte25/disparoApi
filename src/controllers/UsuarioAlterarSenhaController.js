import User from '../models/Usuario.js';
import jwt from 'jsonwebtoken';
import senhaHashMiddleware from '../middlewares/senhaHashMiddleware.js';
import dotenv from 'dotenv';
import SendMail from '../utils/SendMail.js';
import { URL } from 'url';
dotenv.config()


class UsuarioAlterarSenha {
  static alterarsenha = async (req, res) => {
    try {

      const token = req.query.token;

      // verificar se o token veio na rota
      if (!token) {
        return res.status(498).json({ code: 498, message: "Token de autenticação não recebido na rota!" })
      }
      // verificar se o token é válido
      const decoded = jwt.verify(token, process.env.SECRET);
      if (!decoded) {
        return res.status(498).json({ code: 498, message: "Token inválido!" })
      }

      // buscar o usuário no banco de dados
      const userExist = await User.findOne({ _id: decoded.id }).select('+token');

      if (!userExist) {
        return res.status(404).json({ code: 404, message: "Usuário não encontrado!" })
      }

      // verficar se a senha foi enviada na requisição
      if (!req.body.senha) {
        return res.status(400).json({ code: 400, message: "Senha não enviada na requisição!" })
      }

      // criptografar a senha
      const senhaHash = await senhaHashMiddleware.criptogafar(req.body.senha);

      // verificar se o token recebido na rota é igual ao token do usuário no banco de dados
      if (userExist.token != token) {
        return res.status(498).json({ code: 498, message: "Token corrompido!" })
      }

      // atualizar a senha do usuário no banco de dados
      const alterar = User.findByIdAndUpdate(userExist._id, {
        $set: {
          senha: senhaHash,
          token
        }
      })
      await alterar;

      if (!alterar) {
        return res.status(500).json({ code: 500, message: "Erro ao atualizar a senha do usuário!" })
      }
      return res.status(200).json({ code: 200, message: "Senha atualizada com sucesso!" })

    } catch (err) {
      SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req); // se o token não for válido
      return res.status(498).json({ error: true, code: 498, message: "O token inválido!" })
    }
  }
}

export default UsuarioAlterarSenha;
