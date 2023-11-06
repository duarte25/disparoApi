import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { URL } from 'url';


dotenv.config()

class SendMail {
  static async enviaEmail(infoemail) {
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
          from: process.env.USER_SEND_EMAIL,
          to: infoemail.to,
          subject: infoemail.subject + ' Email: #' + await hashId(),
          text: infoemail.text,
          html: infoemail.html
        });
      }
      main().catch(console.error);

    } catch (err) {
      // console.error(err);
      // SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
      // return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
    }
  }

  static async enviaEmailError(err, pathname, date, req) {
    try {
      const infoEmail = {
        to: process.env.ADMIN_EMAIL,
        subject: "Envio de erro interno do servidor na classe: " + pathname,
        text: "Erro Detectado \n\n " + "Erro interno do Servidor" + "\n\n" + "Atenciosamente,\n" + "Equipe de suporte" + "\n\n" + "Erro: " + err.message + "\n\n" + "Arquivo: " + pathname + "\n\n" + "Data e Hora: " + date,
        html: "<p>Olá </p><p>Erro interno do Servidor <strong>" + "</strong></p><p>Atenciosamente,</p><p>Equipe de suporte</p><p>Erro: " + err.message + "</p><p>Arquivo: " + pathname + "</p><p>Data e Hora: " + date + "</p>" + "<p>Requisição: " + req.method + "</p>" + "<p>URL: " + req.protocol + '://' + req.get('host') + req.originalUrl + "</p>"
      }
      SendMail.enviaEmail(infoEmail);

      return res.status(500).json({ error: true, code: 500, message: "Email enviado com sucesso" })
    } catch (err) {
      // console.error(err);
      // SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
      // return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
    }
  }

  static async enviaEmailErrorDbConect(err, pathname, date) {
    try {
      const infoEmail = {
        to: process.env.ADMIN_EMAIL,
        subject: "Envio de erro interno do servidor na classe: " + pathname,
        text: "Erro Detectado \n\n " + "Erro interno do Servidor" + "\n\n" + "Atenciosamente,\n" + "Equipe de suporte" + "\n\n" + "Erro: " + err.message + "\n\n" + "Arquivo: " + pathname + "\n\n" + "Data e Hora: " + date,
        html: "<p>Olá </p><p>Erro interno do Servidor <strong>" + "</strong></p><p>Atenciosamente,</p><p>Equipe de suporte</p><p>Erro: " + err.message + "</p><p>Arquivo: " + pathname + "</p><p>Data e Hora: " + date + "</p>"
      }
        SendMail.enviaEmail(infoEmail);
    } catch (err) {
      // console.error(err);
      // SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date());
      // return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
    }
  }
}
export default SendMail;