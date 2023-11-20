import User from '../models/Usuario.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import SendMail from '../utils/SendMail.js';
import { URL } from 'url';

dotenv.config()

class recuperasenhaController {
  static recuperar = async (req, res) => {
    try {
      const { email } = req.body;
      // BUSCAR O USUÁRIO NO BANCO DE DADOS QUE TENHA O EMAIL INFORMADO E QUE ESTEJA ATIVO
      const userExist = await User.findOne({ email: email });

      // se o usuário não existir
      if (!userExist) {
        return res.status(404).json({ code: 400, message: "Usuário não encontrado!" })
      }

      // se o usuário existir, gerar um token de recuperação de senha
      const token = jwt.sign({ id: userExist._id }, process.env.SECRET, {
        expiresIn: process.env.EXPIREIN
      });

      // atualizar o token do usuário no banco de dados
      if (!token) {
        return res.status(500).json({ code: 500, message: "Erro ao gerar o token de recuperação de senha!" })
      } else {
        const alterar = User.findByIdAndUpdate(userExist._id, {
          $set: {
            token: token
          }
        })
        await alterar;
        if (!alterar) {
          return res.status(500).json({ code: 500, message: "Erro ao atualizar o token do usuário!" })
        } else {
          // enviar o email 
          await enviarEmail(userExist, token)
          return res.status(200).json({ code: 200, email: userExist.email, message: 'Token gerado, guardado no banco de dados e enviado por email!' })
        }
      }
    } catch (err) {
      SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
      return res.status(500).json({ code: 500, message: err.message });
    }
  }
}

// função para enviar o email    
async function enviarEmail(userExist, token) {
  // criar um transportador para enviar o email
  try {
    async function main() {
      let transporter = nodemailer.createTransport({
        host: process.env.HOST_SERVER_EMAIL,
        port: process.env.PORT_SSL_EMAIL,
        secure: false,
        auth: {
          user: process.env.USER_SEND_EMAIL,
          pass: process.env.PASS_SEND_EMAIL,
        },
      });

      async function hashId() {
        return crypto.randomBytes(6).toString('hex');
      }

      let info = await transporter.sendMail({
        from: '"Fslab - API: Alteração de Senha - Solicitação "' + await hashId() + ' <falecomgilberto@gmail.com>',
        to: userExist.email,
        subject: "Olá, " + userExist.nome + " você solicitou a recuperação de senha!",
        text: "Click no link abaixo para alterar sua senha!",
        html: "Olá " + userExist.nome + ", você solicitou a recuperação de senha! <br> <a> "+(token)+"</a>",
      });

      // console.log("Message sent: %s", info.messageId);
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    main().catch(console.error);

    // console.log((process.env.URL_FSAUTH + "/alterarsenha/?token=" + token));
  }
  catch (err) {
    return res.status(500).json({ code: 500, message: err.message });
  }
}

export default recuperasenhaController;