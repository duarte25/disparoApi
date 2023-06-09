import jwt from "jsonwebtoken";
import { promisify } from "util";

const AuthMiddleware = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(498).json([{ code: 498, message: "O token de autenticação não existe!" }])
    }

    const [, token] = auth.split(" ");

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(498).json([{ error: true, code: 498, message: "Token expirado!" }])
      }

      next();
    })

  } catch (error) {
    return res.status(498).json({ error: true, code: 498, message: "Token inválido!" });
  }
}

export default AuthMiddleware;