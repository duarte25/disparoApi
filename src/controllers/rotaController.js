import Rota from "../models/Rota.js";

class RotaController {
  static listarRotas = async (req, res) => {
    try {
      const rota = req.query.rota;
      const page = req.query.page;
      const perPage = req.query.page;

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage)
      }

      if (rota) {
        const rotas = await Rota.paginate({ rota: RegExp(rota, "i") }, options);
        return res.status(200).json(rotas);
      }

      const rotas = await Rota.paginate({}, options);
      return res.status(200).json(rotas);

    } catch (erro) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }
}

export default RotaController;