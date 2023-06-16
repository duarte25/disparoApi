import Usuarios from "../models/Usuario.js";
import Rotas from "../models/Rota.js";
import GrupoUsuarios from "../models/GrupoUsuario.js";
import GrupoPortas from "../models/GrupoPorta.js";
import jwt from "jsonwebtoken";

let falhas = [];

const pegaToken = async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");
  let id = null;
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(498).json([{ error: true, code: 498, message: "Token expirado !" }])
      }
      id = decoded.id;
    })
    return id;
  } else {
    return res.status(498).json([{ error: true, code: 498, message: "Não possui token de autenticação !" }])
  }
}

class AuthPermission {
  static verifyPermission = async (rota_acessada, verbo, req, res) => {
    falhas.length = 0;

    const usuario = await Usuarios.findById(await pegaToken(req, res));

    if (!usuario.ativo) {
      return res.status(401).json([{ code: 401, message: "Usuário inativo, solicite acesso ao administrador do sistema" }])
    }

    const rota = await Rotas.findOne({ rota: { $eq: rota_acessada } });

    if (!rota) {
      return res.status(401).json([{ code: 401, message: "Rota  /" + rota_acessada.toUpperCase() + " não cadastrada no sistema, contate o administrador do sistema." }])
    }

    if (!rota.ativo) {
      return res.status(401).json([{ code: 401, message: "Rota  /" + rota_acessada.toUpperCase() + " está desativada para todos os usuarios do sistema, contate o administrador do sistema." }])
    }

    if (!rota["verbo_" + verbo]) {
      return res.status(401).json([{ code: 401, message: "Operação  " + verbo.toUpperCase() + " está desativada para todos os usuarios do sistema, contate o administrador do sistema." }])
    }

    let user = JSON.parse(JSON.stringify(usuario));

    user.grupoUsuarios = await GrupoUsuarios.find({ _id: { $in: user.grupoUsuarios } }).lean();

    // Rotas do usuário
    for (let i = 0; i < user.rotas.length; i++) {
      if (user.rotas[i].rota === rota_acessada) {
        if (user.rotas[i].ativo) {
          if (user.rotas[i]["verbo_" + verbo]) {
            try {
              falhas.length = 0;
              return;
            } catch (error) {
              console.error(error);
              return res.status(500).json([{ code: 500, message: "Erro interno do servidor: Falha de retorno de chamada (callback)" }]);
            }
          } else {
            falhas.push({ error: true, code: 401, message: "A operação " + verbo.toUpperCase() + " na rota: /" + rota_acessada.toUpperCase() + " está desativada para o usuário logado, contato o administrador do sistema." })
          }
        } else {
          falhas.push({ error: true, code: 401, message: "A rota: /" + rota_acessada.toUpperCase() + " está desativada para o perfil do usuário logado, contate o administrador do sistema." })
        }
      }
    }

    // Rotas do grupo de usuários
    for (let i = 0; i < user.grupoUsuarios.length; i++) {
      if (user.grupoUsuarios[i].ativo) {
        for (let j = 0; j < user.grupoUsuarios[i].rotas.length; j++) {
          if (user.grupoUsuarios[i].rotas[j].rota == rota_acessada) {
            if (user.grupoUsuarios[i].rotas[j].ativo) {
              if (user.grupoUsuarios[i].rotas[j]["verbo_" + verbo]) {
                try {
                  falhas.length = 0;
                  return;
                } catch (error) {
                  console.error(error);
                  return res.status(500).json([{ code: 500, message: "Erro interno do servidor: Callback fail" }])
                }
              }
            } else {
              falhas.push({ error: true, code: 401, message: "A rota /" + rota_acessada.toUpperCase() + " está inativada para o grupo: " + user.grupoUsuarios[i].nome + ", contate o administrador do sistema." })
            }
          }
        }
      } else {
        falhas.push({ error: true, code: 401, message: "Grupo " + user.grupoUsuarios[i].nome + " está inativo, contate o administrador do sistema." })
      }
    }
    
    if (falhas.length) {
      return res.status(401).json(falhas);
    }

  }
}

export default AuthPermission;