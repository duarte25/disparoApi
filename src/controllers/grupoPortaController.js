import GrupoPorta from "../models/GrupoPorta.js";

export default class GrupoPortaController {
    static listarGrupoPortas = async (req, res) => {
        try {
            const nome = req.query.nome;
            const descricao = req.query.descricao;
            const ativo = req.query.ativo;
            const page = req.query.page;
            const perPage = req.query.perPage;

            const option = { //limitar a quantidade máxima por requisição
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
            };

            if (nome) {
                //retorno da busca por nome do grupo porta
                const grupoP = await GrupoPorta.paginate({ nome: new RegExp(nome, "i") }, option);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }

            if (descricao) {
                const grupoP = await GrupoPorta.paginate({ descricao: new RegExp(descricao, "i") }, option);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }

            if (ativo) {
                const grupoP = await GrupoPorta.paginate({ ativo: ativo }, option);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }

            if (nome && descricao) {
                const grupoP = await GrupoPorta.paginate({ $and: [{ nome: new RegExp(nome, "i") }, { descricao: new RegExp(descricao, "i") }] }, option);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }

            const grupoP = await GrupoPorta.paginate({}, option);
            const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
            return res.status(200).json(resultGrupoPorta)

        } catch (erro) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
        }
    }
}