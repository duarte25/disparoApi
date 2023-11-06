import rotas from "../../models/Rota.js";
import SendMail from "../SendMail.js";
import { URL } from 'url';

class ValidaRota {
    static validar(req, res, next) {
        try {
            // validar os dados
            const erros = [];
            erros.length = 0;

            if (req.body.rota == null || req.body.rota == undefined || req.body.rota == "") {
                erros.push({ code: 400, message: "Rota é obrigatório!" })
            }
            if (req.body.dominio == null || req.body.dominio == undefined || req.body.dominio == "") {
                erros.push({ code: 400, message: "Domínio é obrigatório!" })
            }
            if (req.body.unidades == null || req.body.unidades == undefined || req.body.unidades == "") {
                erros.push({ code: 400, message: "Unidades é obrigatório!" })
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
export default ValidaRota;