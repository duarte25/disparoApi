import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import SendMail from "../utils/SendMail.js";
import { URL } from 'url';

dotenv.config()

// valiidar se o id é válido
class senhaHashMiddleware {
    // busar o usuario pelo id
    static async criptogafar(senha) {
        try {
            let senhaHash = bcrypt.hashSync(senha, 8); // criptografar a senha
            return senhaHash;
        } catch (err) {
            SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
    }
}
export default senhaHashMiddleware;
