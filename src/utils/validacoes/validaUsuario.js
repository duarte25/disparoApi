import Usuario from "../../models/Usuario.js";
import SendMail from "../SendMail.js";
import { URL } from 'url';

class ValidaUsuario {
    static validar(req, res, next) {
        try {
            // validar os dados
            const erros = [];
            erros.length = 0;

            if (req.body.nome == null || req.body.nome == undefined || req.body.nome == "" || req.body.nome.length < 4) {
                erros.push({ code: 400, message: "Nome é obrigatório e deve ter no mínimo 4 caracteres!" })
            }
            if (req.body.email == null || req.body.email == undefined || req.body.email == "") {
                erros.push({ code: 400, message: "E-mail é obrigatório!" })
            }

            //verficiar se a senha tem no mínimo 8 caracteres e se tem letras e números e se tem caracteres especiais e se tem letras maiúsculas usando expressão regular
            if (req.body.senha == null || req.body.senha == undefined || req.body.senha == "" || req.body.senha.length < 8 || !req.body.senha.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                erros.push({ code: 400, message: "Senha é obrigatória e deve ter no mínimo 8 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais!" })
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

    static validarSenha(req, res, next) {
        try {
            // validar os dados
            const erros = [];
            erros.length = 0;

            if (req.body.senha == null || req.body.senha == undefined || req.body.senha == "" || req.body.senha.length < 8 || !req.body.senha.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                erros.push({ code: 400, message: "Senha é obrigatória e deve ter no mínimo 8 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais!" })
            }

            if (erros.length > 0) {
                return res.status(400).json(erros)
            }

            next();

        }
        catch (err) {
            SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
        }
    }

// senha não é obrigatória
    static validarSenhaPatch(req, res, next) {
        try {
            // validar os dados
            const erros = [];
            erros.length = 0;

            if (req.body.senha != null && req.body.senha.length < 8 && !req.body.senha.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                erros.push({ code: 400, message: "A senha deve ter no mínimo 8 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais!" })
            }

            if (erros.length > 0) {
                return res.status(400).json(erros)
            }

            next();

        }
        catch (err) {
            SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
        }
    }




}
export default ValidaUsuario;