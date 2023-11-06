import { isValid } from 'date-fns';
import { URL } from 'url';

async function isDateValid(dateString) {
  try {
    // testar dateString se for válido, retorna a data
    const date = new Date(dateString);
    // testar se é uma data válida no calendário
    if (isNaN(date)) {
      return false;
    }

    if (isValid(date)) {
      return true;
    }
  } catch (err) {
    // console.error(err);
    SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
    return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
  }
}

export default isDateValid;