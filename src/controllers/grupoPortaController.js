import GrupoPorta from "../models/GrupoPorta.js";
import AuthPermission from "../middlewares/AuthPermission.js"


export default class GrupoPortaController {
    static listarGrupoPortas = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoPortas", "get", req,res) !== false) {
                return;
              } 
            const nome = req.query.nome;
            const descricao = req.query.descricao;
            const ativo = req.query.ativo;
            const page = req.query.page;
            const perPage = req.query.perPage;

            const options = { //limitar a quantidade máxima por requisição
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
            };

            if (nome && descricao) {
                const grupoP = await GrupoPorta.paginate({ $and: [{ nome: new RegExp(nome, "i") }, { descricao: new RegExp(descricao, "i") }] }, options);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }

            if (nome) {
                //retorno da busca por nome do grupo porta
                const grupoP = await GrupoPorta.paginate({ nome: new RegExp(nome, "i") }, options);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }

            if (descricao) {
                const grupoP = await GrupoPorta.paginate({ descricao: new RegExp(descricao, "i") }, options);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }

            if (ativo) {
                const grupoP = await GrupoPorta.paginate({ ativo: ativo }, options);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }


            const grupoP = await GrupoPorta.paginate({}, options);
            const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
            return res.status(200).json(resultGrupoPorta)

        } catch (erro) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
        }
    }

    static listarGrupoPortaId = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoPortas:id", "get", req,res) !== false) {
                return;
              } 
            const id = req.params.id;

            await GrupoPorta.findById(id).then((grupoP) => {
                if (grupoP) {
                    return res.status(200).send(grupoP.toJSON());
                } else {
                    return res.status(404).json({ error: true, code: 404, message: "Grupo Porta não encontrada" })
                }
            }).catch((error) => {
                return res.status(400).json({ error: true, code: 400, message: "ID inválido!" })
            })

        } catch (erro) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static cadastrarGrupoPorta = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoPortas", "post", req,res) !== false) {
                return;
              } 
            const grupoP = new GrupoPorta(req.body);

            await grupoP.save().then((grupoP) => {
                return res.status(201).send(grupoP.toJSON());

            }).catch((error) => {
                return res.status(400).json({ message: error.message })
            })

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static atualizarPatch = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoPortas:id", "patch", req,res) !== false) {
                return;
              } 
            const id = req.params.id;
            const corpo = req.body;

            await GrupoPorta.findByIdAndUpdate(id, corpo).then((grupoP) => {
                if (Object.keys(corpo).length < 1) {
                    return res.status(400).json({ messagem: "Não existe dados para ser atualizado" })
                }
                return res.status(200).json({ message: "Grupo Porta atualizada com sucesso!" })
            }).catch((error) => {
                return res.status(400).json({ message: `Erro ao atualizar - ${error.message}` })
            })

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static atualizarPut = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoPortas:id", "put", req,res) !== false) {
                return;
              } 
            const id = req.params.id;
            const corpo = req.body;

            await GrupoPorta.findOneAndReplace({ _id: id }, corpo, { omitUndefined: false }).then((grupoP) => {
                if (Object.keys(corpo).length < 1) {
                    return res.status(400).json({ message: "Nenhum dado a ser atualizado" })
                }
                return res.status(200).json({ message: "Grupo Porta atualizada com sucesso" })
            }).catch((error) => {
                return res.status(400).json({ message: `Erro ao atualizar Grupo Porta - ${error.message}` })
            })

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static deletarGrupoPorta = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoPortas:id", "delete", req,res) !== false) {
                return;
              } 
            const id = req.params.id;

            await GrupoPorta.findByIdAndDelete(id).then((grupoP) => {
                return res.status(200).json({ message: "Grupo Porta deletado com sucesso" })
            }).catch((error) => {
                return res.status(400).json({ message: "Erro ao deletar o Grupo Porta" })
            })
        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }
}