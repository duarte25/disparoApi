import Usuarios from "../models/Usuario.js";
import Rotas from "../models/Rota.js";
import GrupoUsuarios from "../models/GrupoUsuario.js";
import GrupoPortas from "../models/GrupoPorta.js";

const falhas = [];

const pegaToken = async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(498).json([{ error: true, code: 498, message: "Token expirado!" }])
    }

    console.log(decoded);

    return decoded.id;
  })
}

class AuthPermission {
  static verifyPermission = async (rota_acessada, verbo, req, res) => {
    falhas.length = 0;

    const usuarioPerfil = await Usuarios.findById(await pegaToken(req, res));


    console.log(usuarioPerfil);
  }
}

export default AuthPermission;