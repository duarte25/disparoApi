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
                const porta = await Porta.paginate({ ativo: ativo }, option);
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
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static listarPortaPorId = async (req, res) => {
        try {
            const id = req.params.id;
            await Porta.findById(id).then((portas) => {
                if (portas) {
                    return res.status(200).send(portas.toJSON());
                } else {
                    return res.status(404).json({ error: true, code: 404, message: "Id da porta não localizado." })
                }
            }).catch((error) => {
                return res.status(400).json({ error: true, code: 400, message: "id invalido" })
            })
        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
    }

    static cadastrarPorta = async (req, res) => {
        try {
            const porta = new Porta(req.body);

            await porta.save().then((porta) => {
                return res.status(201).send(porta.toJSON())
            }).catch((error) => {
                return res.status(404).json({ message: error.message })
            })

        } catch (erro) {
            return res.status(500).json({ erro: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static atualizarPatch = async (req, res) => {
        try {
            const id = req.params.id;
            const corpo = req.body;

            await Porta.findByIdAndUpdate(id, corpo).then((porta) => {
                if (Object.keys(corpo).length < 1) {
                    return res.status(400).json({ message: "Nenhum dado a ser atualizado" })
                }
                return res.status(200).json({ message: "Porta atualizada com sucesso" })
            }).catch((error) => {
                return res.status(400).json({ message: `Erro ao atualizar Porta - ${error.message}` })
            })

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static atualizarPut = async (req, res) => {
        try {
            const id = req.params.id;
            const corpo = req.body;

            await Porta.findOneAndReplace({ _id: id }, corpo, { omitUndefined: false }).then((porta) => {
                if (Object.keys(corpo).length < 1) {
                    return res.status(400).json({ message: "Nenhum dado a ser atualizado" })
                }
                return res.status(200).json({ message: "Porta atualizada com sucesso" })
            }).catch((error) => {
                return res.status(400).json({ message: `Erro ao atualizar porta - ${error.message}` })
            })
        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

    static deletePorta = async (req, res) => {
        try {
            const id = req.params.id;

            await Porta.findByIdAndDelete(id).then((porta) => {
                return res.status(200).json({ message: "Porta deletada com sucesso" })
            }).catch((error) => {
                return res.status(400).json({ message: "Erro ao deletar a porta" })
            })

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" })
        }
    }

}
