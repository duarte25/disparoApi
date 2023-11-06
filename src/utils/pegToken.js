import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import SendMail from "./SendMail.js";
import { URL } from 'url';

async function pegaToken(req) {
  try {
    const [, token] = req.headers.authorization.split(' '); // desestruturação
    let decoded = await promisify(jwt.verify)(token, process.env.SECRET); // promisify converte uma função de callback para uma função async/await
    req.user_id = decoded.id;
    if (!decoded) {
      return res.status(401).json({ code: 401, error: true, message: "Faltou o token de autorização!" });
    } else {
      return req.user_id;
    }
  } catch (err) {
    // console.error(err);
    SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
    return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
  }
}

export default pegaToken;


