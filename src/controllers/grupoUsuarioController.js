import GrupoUsuario from "../models/GrupoUsuario.js"
import AuthPermission from "../middlewares/AuthPermission.js"


export default class GrupoUsuarioController {
    static listarGrupoUsuarios = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoUsuarios", "get", req, res) !== false) {
                return;
            }
            const nome = req.query.nome;
            const page = req.query.page;
            const perPage = req.query.perPage;

            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) || 10 ? 10 : parseInt(perPage) || 10
            }

            if (nome) {
                const grupoUsuarios = await GrupoUsuario.paginate({ nome: new RegExp(nome, "i") }, options);
                const grupoUsuariosResult = JSON.parse(JSON.stringify(grupoUsuarios));
                return res.status(200).json(grupoUsuariosResult);
            } else {
                const grupoUsuarios = await GrupoUsuario.paginate({}, options);
                const grupoUsuariosResult = JSON.parse(JSON.stringify(grupoUsuarios));
                return res.status(200).json(grupoUsuariosResult);
            }


        } catch (erro) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static listarPorId = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoUsuarios:id", "get", req, res) !== false) {
                return;
            }
            const id = req.params.id;

            await GrupoUsuario.findById(id).then((grupoUsuarios) => {
                if (grupoUsuarios) {
                    return res.status(200).send(grupoUsuarios.toJSON());
                } else {
                    return res.status(404).json({ error: true, code: 404, message: "Grupo de Usuario não encontrado" })
                }
            }).catch((erro) => {
                return res.status(400).json({ error: true, code: 400, message: "ID inválido" })
            })
        } catch (erro) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static cadastarGrupoUsuario = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoUsuarios", "post", req, res) !== false) {
                return;
            }
            const grupoUsuario = new GrupoUsuario(req.body);

            await grupoUsuario.save().then((grupoUsuario) => {
                return res.status(201).send(grupoUsuario.toJSON());
            }).catch((erro) => {
                return res.status(400).json({ message: erro.message })
            })

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static atualizarPut = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoUsuarios:id", "put", req, res) !== false) {
                return;
            }
            const id = req.params.id;
            const corpo = req.body;

            await GrupoUsuario.findOneAndReplace({ _id: id }, corpo, { omitUndefined: false }).then((rota) => {
                if (Object.keys(corpo).length < 1) {
                    return res.status(400).json({ message: "Nenhum dado a ser atualizado" })
                } else {
                    return res.status(200).json({ message: "Grupo de Usuário atualizado com sucesso" })
                }
            }).catch((error) => {
                return res.status(400).json({ message: `Erro ao atualizar grupo de usuário - ${error.message}` })
            })

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static atualizarPatch = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoUsuarios:id", "patch", req, res) !== false) {
                return;
            }
            const id = req.params.id;
            const corpo = req.body;

            await GrupoUsuario.findByIdAndUpdate(id, corpo).then((grupoUsuarios) => {
                if (Object.keys(corpo).length < 1) {
                    return res.status(400).json({ message: "Nenhum dado a ser atualizado" })
                } else {
                    return res.status(200).json({ message: 'Grupo de usuarios atualizado com Sucesso' })
                }
            }).catch((error) => {
                return res.status(400).json({ message: `Erro ao atualizar Grupo de Usuarios - ${error.message}` })
            })

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static deletarGrupoUsuarios = async (req, res) => {
        try {
            if (await AuthPermission.verifyPermission("grupoUsuarios:id", "delete", req, res) !== false) {
                return;
            }
            const id = req.params.id;

            await GrupoUsuario.findByIdAndDelete(id).then((grupoUsuarios) => {
                return res.status(200).json({ message: 'Grupo de Usuário deletado com sucesso' })
            }).catch((error) => {
                return res.status(400).json({ message: `Erro ao deletar Grupo de Usuario - ${error.message}` })
            })

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }
}