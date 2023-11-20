import dotenv from 'dotenv';
import SendMail from '../utils/SendMail.js';
import { URL } from 'url';

dotenv.config()

class enviaremailController {
  static enviarEmail = async (req, res) => {
    try {
      const infoEmail = {};
      console.log(req.body)
      infoEmail.subject = req.body.subject;
      infoEmail.text = req.body.text;
      infoEmail.html = req.body.html;
      infoEmail.to = process.env.ADMIN_EMAIL;

      if (!infoEmail.subject || !infoEmail.text || !infoEmail.html || !infoEmail.to) {
        return res.status(400).json({ code: 400, message: "Dados incompletos" })
      }
      
      // Enviar email recebido para aa função enviaEmail
      SendMail.enviaEmail(infoEmail);    

      return res.status(200).json({ code: 200, message: "Email enviado com sucesso" })

    } catch (err) {
      SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
      return res.status(500).json({ code: 500, message: err.message });
    }
  }
}


export default enviaremailController;