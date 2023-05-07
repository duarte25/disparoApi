import { json } from "express";
import GrupoPorta from "../models/GrupoPorta.js";

export default class GrupoPortaController{
    //GET - listar Grupo Portas por nome com paginação
    static listarGrupoPorta = async (req, res)=>{
        try{
            const nome = req.query.nome;
            const descricao = req.query.descricao;
            const ativo = req.query.ativo;
            const page = req.query.page;
            const perPage = req.query.perPage;

            const option = { //limitar a quantidade máxima por requisição
                nome:(nome),
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
            };

            if (nome){
                //retorno da busca por nome do grupo porta
                const grupoP = await GrupoPorta.paginate({nome: new RegExp(nome, "i")}, option);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }

            if (descricao){
                //retorno da busca por descrição do grupo porta
                const grupoP = await GrupoPorta.paginate({descricao: new RegExp(descricao, "i")}, option);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }

            if (ativo){
                //retorno da busca por grupo porta ativa
                const grupoP = await GrupoPorta.paginate({ativo: new RegExp(ativo, "i")}, option);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }

            if(nome && descricao && ativo){
                //retorno da tres busca: nome, descricao e ativo do grupo porta
                const grupoP = await GrupoPorta.paginate({$and: [{nome: new RegExp(nome, "i")},{descricao: new RegExp(descricao, "i")}, {ativo: new RegExp(ativo, "i")}]}, option);
                const resultGrupoPorta = JSON.parse(JSON.stringify(grupoP));
                return res.status(200).json(resultGrupoPorta);
            }

        }catch(erro){
            //retorno do erro caso a solicitação não pode ser atendida.
            console.error(erro);
            res.status(500).json({mensagem: 'Erro ao buscar grupos de portas'});

        }
    }
}