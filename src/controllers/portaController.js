import Porta from "../models/Porta.js";

export default class PortaController {

    static listarPorta = async (req, res) => {
        try {
            const descricao = req.query.descricao;
            const ambiente = req.query.ambiente;
            const ativo = req.query.ativo;
            const page = req.query.page;
            const perPage = req.query.perPage;

            const option = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
            };

            if (descricao) {
                const porta = await Porta.paginate({ descricao: new RegExp(descricao, "i") }, option);
                const resultPortas = JSON.parse(JSON.stringify(porta));
                return res.status(200).json(resultPortas);
            }

            if (ambiente) {
                const porta = await Porta.paginate({ descricao: new RegExp(ambiente, "i") }, option);
                const resultPortas = JSON.parse(JSON.stringify(porta));
                return res.status(200).json(resultPortas);
            }

            if (ativo) {
                const portas = await Porta.paginate({ ativo: ativo }, option);
                const resultPortas = JSON.parse(JSON.stringify(porta));
                return res.status(200).json(resultPortas);
            }

            if (descricao && ambiente) {
                const porta = await Porta.paginate({ $and: [{ descricao: new RegExp(descricao, "i") }, { ambiente: new RegExp(ambiente, "i") }] }, option);
                const resultPortas = JSON.parse(JSON.stringify(porta));
                return res.status(200).json(resultPortas);
            }

            const porta = await Porta.paginate({}, option);
            const resultPortas = JSON.parse(JSON.stringify(porta));
            return res.status(200).json(resultPortas);

        } catch (erro) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });

        }
    }
}
