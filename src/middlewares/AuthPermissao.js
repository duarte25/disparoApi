import Usuarios from "../models/Usuario.js";
import Rotas from "../models/Rota.js";
import GrupoUsuarios from "../models/GrupoUsuario.js";
import GrupoPortas from "../models/GrupoPorta.js";

const falhas = [];

const pegaToken = async (req,res) => {
  const [, token] = req.headers.authorization.split(" ");
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(498).json([{ error: true, code: 498, message: "Token expirado!" }])
    }

    next();
  })

}