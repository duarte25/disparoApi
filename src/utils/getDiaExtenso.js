import SendMail from "../utils/SendMail.js";
import { URL } from 'url';

// Retornar o dia por extenso de uma data no padrão mongodb
async function getDiaExtenso(dateStr) {
    try {
        var date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR', { weekday: 'long' });
    } catch (err) {
        // console.error(err);
        SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
        return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
    }
}

export default getDiaExtenso;
