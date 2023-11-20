import dotenv from 'dotenv';
import SendMail from '../utils/SendMail.js';
import { URL } from 'url';
import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

dotenv.config();

class enviaremailController {
  static enviarEmail = async (req, res) => {
    try {
      const infoEmail = {
        subject: req.body.subject,
        text: req.body.text,
        to: req.body.email
      };

      if (!infoEmail.subject || !infoEmail.text || !infoEmail.to) {
        return res.status(400).json({ code: 400, message: "Dados incompletos" });
      }

      const userExist = await Usuario.findOne({ email: infoEmail.to }).select('+senha');

      if (!userExist) {
        return res.status(404).json({ code: 404, message: "Usuário não encontrado" });
      }

      const token = jwt.sign({
        id: userExist.id,
        nome: userExist.nome,
        email: userExist.email,
        ativo: userExist.ativo
      }, process.env.SECRET, { expiresIn: process.env.EXPIREIN });

      const userInfo = {
        id: userExist._id,
        nome: userExist.nome,
        email: userExist.email,
        ativo: userExist.ativo,
        rotas: userExist.rotas,
        grupoUsuarios: userExist.grupoUsuarios,
        grupoPortas: userExist.grupoPortas
      };

      const response = {
        token,
        user: userInfo
      };

      const alterar = Usuario.findByIdAndUpdate(userExist._id, {
        $set: {
          token
        }
      })
      await alterar;

      infoEmail.html = JSON.stringify(response);

      // Enviar email recebido para a função enviaEmail
      SendMail.enviaEmail(infoEmail);

      return res.status(200).json({ code: 200, message: "Email enviado com sucesso" });

    } catch (err) {
      SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
      return res.status(500).json({ code: 500, message: err.message });
    }
  }
}

export default enviaremailController;
