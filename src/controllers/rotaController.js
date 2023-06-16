import AuthPermission from "../middlewares/AuthPermission.js";
import Rota from "../models/Rota.js";

export default class RotaController {

  static listarRotas = async (req, res) => {
    try {

      await AuthPermission.verifyPermission("rotas", "get", req,res)

      const rota = req.query.rota;
      const page = req.query.page;
      const perPage = req.query.perPage;

      // opções de paginação
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      }

      if (rota) {
        const rotas = await Rota.paginate({ rota: new RegExp(rota, "i") }, options);
        const rotasJson = JSON.parse(JSON.stringify(rotas));
        return res.status(200).send(rotasJson);
      }

      const rotas = await Rota.paginate({}, options);
      const rotasJson = JSON.parse(JSON.stringify(rotas));
      return res.status(200).send(rotasJson);

    } catch (erro) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static listarPorId = async (req, res) => {
    try {
      const id = req.params.id;

      await Rota.findById(id).then((rota) => {
        if (rota) {
          return res.status(200).send(rota.toJSON());
        } else {
          return res.status(404).json({ error: true, code: 404, message: "Rota não encontrada" })
        }
      }).catch((erro) => {
        return res.status(400).json({ error: true, code: 400, message: "ID inválido" })
      })

    } catch (erro) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static cadastrarRota = async (req, res) => {
    try {
      const rota = new Rota(req.body);

      await rota.save().then((rota) => {
        return res.status(201).send(rota.toJSON());
      }).catch((erro) => {
        return res.status(400).json({ message: erro.message })
      })

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static atualizarPatch = async (req, res) => {
    try {
      const id = req.params.id;
      const corpo = req.body;

      await Rota.findByIdAndUpdate(id, corpo).then((rota) => {
        if (Object.keys(corpo).length < 1) {
          return res.status(400).json({ message: "Nenhum dado a ser atualizado" })
        }
        return res.status(200).json({ message: "Rota atualizada com sucesso" })
      }).catch((error) => {
        return res.status(400).json({ message: `Erro ao atualizar rota - ${error.message}` })
      })

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static atualizarPut = async (req, res) => {
    try {
      const id = req.params.id;
      const corpo = req.body;

      await Rota.findOneAndReplace({ _id: id }, corpo, { omitUndefined: false }).then((rota) => {
        if (Object.keys(corpo).length < 1) {
          return res.status(400).json({ message: "Nenhum dado a ser atualizado" })
        }
        return res.status(200).json({ message: "Rota atualizada com sucesso" })
      }).catch((error) => {
        return res.status(400).json({ message: `Erro ao atualizar rota - ${error.message}` })
      })

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }

  static deletarRota = async (req, res) => {
    try {
      const id = req.params.id;

      await Rota.findByIdAndDelete(id).then((rota) => {
        return res.status(200).json({ message: "Rota deletada com sucesso" })
      }).catch((error) => {
        return res.status(400).json({ message: "Erro ao deletar a rota" })
      })

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
    }
  }



}