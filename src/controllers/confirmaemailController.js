import User from '../models/Usuario.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import SendMail from '../utils/SendMail.js';
import { URL } from 'url';

dotenv.config()

class confirmaemailController {
  static confirmar = async (req, res) => {
    try {
      const { codigo, email } = req.body;
      
      // BUSCAR O USUÁRIO NO BANCO DE DADOS QUE TENHA O EMAIL INFORMADO E QUE ESTEJA ATIVO
      let userExist = await User.findOne({ email: email, ativo: false, codigo_confirma_email: codigo });

      // se o usuário não existir
      if (!userExist) {
        return res.status(404).json({ code: 400, message: "Usuário não encontrado!" })
      }

      const alterarUsuario = User.findByIdAndUpdate(userExist.id, {
        $set: {
          ativo: true,
          codigo_confirma_email: ''
        }
      })

      await alterarUsuario

      if (!alterarUsuario) {
        return res.status(500).json({ code: 500, message: "Erro ao atualizar o token do usuário!" })
      } else {
        // enviar email de confirmação de ativação do cadastro
        const infoEmail = {}
        infoEmail.to = userExist.email;
        infoEmail.subject = "Envio da confirmação de ativação do cadastro";
        infoEmail.text = "Olá " + userExist.nome + ",\n\n" + "Sua conta foi ativa com sucesso" + "\n\n" + "Atenciosamente,\n" + "Equipe de suporte";
        infoEmail.html = "<p>Olá " + userExist.nome + ",</p><p>Sua conta foi ativa com sucesso <strong> </strong></p><p>Atenciosamente,</p><p>Equipe de suporte</p>";

        enviaemail(infoEmail);

        return res.status(200).json({ code: 200, email: userExist.email, message: 'Conta ativada, guardado no banco de dados e enviado por email!' })
      }
    } catch (err) {
      SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
      return res.status(500).json({ code: 500, message: err.message });
    }
  }
}


export default confirmaemailController;