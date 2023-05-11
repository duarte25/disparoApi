import GrupoUsuario from "../models/GrupoUsuario.js"

export default class GrupoUsuarioController {
    static listaGrupoUsuarios = async (req, res) => {
        try {
            const nome = req.query.nome;
            const descricao = req.query.descricao;
            const ativo = req.query.ativo;
            const page = req.query.page;
            const perPage = req.query.perPage;

            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) || 10 ? 10 : parseInt(perPage) || 10
            }

            if (nome) {
                const grupoUsuarios = GrupoUsuario.paginate({ nome: new RegExp(nome, "i") }, options);
                const grupoUsuariosResult = JSON.parse(JSON.stringify(grupoUsuarios));
                return res.status(200).json(grupoUsuariosResult);
            }

            if (descricao) {
                const grupoUsuarios = GrupoUsuario.paginate({ descricao: new RegExp(descricao, "i") }, options);
                const grupoUsuariosResult = JSON.parse(JSON.stringify(grupoUsuarios));
                return res.status(200).json(grupoUsuariosResult);
            }

            if (ativo) {
                const grupoUsuarios = GrupoUsuario.paginate({ ativo: ativo }, options);
                const grupoUsuariosResult = JSON.parse(JSON.stringify(grupoUsuarios));
                return res.status(200).json(grupoUsuariosResult);
            }

            if (nome && descricao) {
                const grupoUsuarios = GrupoUsuario.paginate({ $and: [{ nome: new RegExp(nome, "i") }, { descricao: new RegExp(descricao, "i") }] }, options);
                const grupoUsuariosResult = JSON.parse(JSON.stringify(grupoUsuarios));
                return res.status(200).json(grupoUsuariosResult);
            }

            const grupoUsuarios = GrupoUsuario.paginate({}, options);
            const grupoUsuariosResult = JSON.parse(JSON.stringify(grupoUsuarios));
            return res.status(200).json(grupoUsuariosResult);

        } catch (erro) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }
}