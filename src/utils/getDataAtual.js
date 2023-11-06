import SendMail from "../utils/SendMail.js";
import { URL } from 'url';

// gerar data atual padrão yyyy-mm-dd
function getDataAtual() {
    try {
        const data = new Date();
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        const dataAtual = mes + '-' + dia + '-' + ano;
        return dataAtual;
    } catch (err) {
        // console.error(err);
        SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
        return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
    }
}

export default getDataAtual;