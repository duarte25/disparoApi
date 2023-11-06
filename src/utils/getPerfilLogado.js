import usuarios from "../models/Usuario.js";
import pegaToken from "./pegToken.js";
import SendMail from "./SendMail.js";
import { URL } from 'url';


async function getPerfilLogado(req, res) {
  try {

    // busca o perfil do usuário logado
    const usuarioPefil = await usuarios.findById(await pegaToken(req));
    if (!usuarioPefil) {
      return res.status(401).json({ code: 401, error: true, message: "Perfil do usuário logado não encontrado!" });
    }
    return usuarioPefil;
  } catch (err) {
    // // console.error(err);
    // SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
    return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
  }
}

export default getPerfilLogado;


