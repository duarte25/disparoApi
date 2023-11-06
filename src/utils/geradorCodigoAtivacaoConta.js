import { randomBytes as _randomBytes } from 'crypto';
import SendMail from "../utils/SendMail.js";
import { URL } from 'url';

async function geradorCodigoAtivacaoConta() {
    try {
        const uniqueHashes = new Set();
        function generateShortHash() {
            const randomBytes = _randomBytes(2);
            // acrescentar o caractere alfanumérico
            const hash = randomBytes.toString('hex').toUpperCase();
            return hash;
        }
        uniqueHashes.add(generateShortHash());
        return uniqueHashes.values().next().value;

    } catch (err) {
        // console.error(err);
        SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
        return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
    }
}

export default geradorCodigoAtivacaoConta;
