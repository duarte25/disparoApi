import SendMail from "../utils/SendMail.js";
import { URL } from 'url';

// extraindo apenas o Id do req.body._id
function getObjectId(id) {
    try {
        const objectId = id;
        const regex = /^[a-fA-F0-9]{24}$/;
        const objectIdString = regex.test(objectId) ? objectId.toString() : null;
        return objectIdString
    } catch (err) {
        // console.error(err);
        SendMail.enviaEmailError(err, new URL(import.meta.url).pathname, new Date(), req);
        return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor " })
    }
}

export default getObjectId;