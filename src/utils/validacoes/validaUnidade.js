import unidades from "../../models/Unidade.js";
import SendMail from "../SendMail.js";
import { URL } from 'url';


class validaUnidade {
    static validar(req, res, next) {
        try {
            // validar os dados
            const erros = [];
            erros.length = 0;

            if (req.body.nome == null || req.body.nome == undefined || req.body.nome == "") {
                erros.push({ code: 400, message: "Nome é obrigatório!" })
            }
            if (req.body.localidade == null || req.body.localidade == undefined || req.body.localidade == "") {
                erros.push({ code: 400, message: "Localidade é obrigatório!" })
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
export default validaUnidade;