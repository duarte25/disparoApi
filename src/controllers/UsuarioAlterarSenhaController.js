import senhaHashMiddleware from "../middlewares/senhaHashMiddleware.js"; 
import usuarios from "../models/Usuario.js";
import pegaToken from "../utils/pegToken.js";
import User from "../models/Usuario.js";


class UsuarioAlterarSenhaController {
  // POST - Alterar senha do usuário
  static alterarSenha = async (req, res) => {
    try {
      // verificar se o token é válido
      const user_id = await pegaToken(req);
      
      const token = req.headers.authorization.split(' ')[1];

      // verficar se  o usuário existe
      const userExist = await usuarios.findOne({ _id: user_id });
      if (!userExist) {
        return res.status(404).json({ code: 404, message: "Usuário não encontrado!" })
      }

      // criptografar a senha
      const senhaHash = await senhaHashMiddleware.criptogafar(req.body.senha);

      // atualizar a senha do usuário no banco de dados
      const alterar = User.findByIdAndUpdate(user_id, {
        $set: {
          senha: senhaHash
        }
      })

      await alterar;

      if (!alterar) {
        return res.status(500).json({ code: 500, message: "Erro ao atualizar a senha do usuário!" })
      }

      return res.status(200).json({ code: 200, message: "Senha atualizada com sucesso!" })

    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }
}

export default UsuarioAlterarSenhaController;