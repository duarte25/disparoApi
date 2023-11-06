import SendMail from "../utils/SendMail.js";
import { URL } from 'url';

const daysOfWeek = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

async function getDayOfWeek(dateString) {
  try {
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  } catch (err) {
    // console.error(err);
    SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
    return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
  }
}

export default getDayOfWeek;