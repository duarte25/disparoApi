import grupos from "../../models/Grupo.js";
import SendMail from "../SendMail.js";
import { URL } from 'url';

class ValidaGrupo {
    static validar(req, res, next) {
        try {
            // validar os dados
            const erros = [];
            erros.length = 0;

            if (req.body.nome == null || req.body.nome == undefined || req.body.nome == "" || req.body.nome.length < 4) {
                erros.push({ code: 400, message: "Nome é obrigatório e deve ter no mínimo 4 caracteres!" })
            }
            if (req.body.descricao == null || req.body.descricao == undefined || req.body.descricao == "" || req.body.descricao.length < 4) {
                erros.push({ code: 400, message: "Descrição é obrigatória e deve ter no mínimo 4 caracteres!" })
            }
            if (req.body.unidades == null || req.body.unidades == undefined || req.body.unidades == "") {
                erros.push({ code: 400, message: "Unidades é obrigatório!" })
            }
            if (req.body.rotas == null || req.body.rotas == undefined || req.body.rotas == "") {
                erros.push({ code: 400, message: "Rotas é obrigatório!" })
            }


            if (erros.length > 0) {
                return res.status(400).json(erros)
            }

            next();
        } catch (err) {
            // console.error(err);
            SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
        }
    }

}
export default ValidaGrupo;