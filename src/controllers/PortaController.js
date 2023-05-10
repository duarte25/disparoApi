import porta from "../models/Porta.js";
import grupo from "../models/Grupo.js";
import grupoPorta from "../models/GrupoPorta.js";
import grupousuario from "..models/GrupoUsuario";
import usuarios from "../models/Usuario.js";

export default class PortaController{
    
    static listarPorta = async (req, res)=>{
        try{
            const nome = req.query.nome;
            const descricao = req.query.descricao;
            const ambiente = req.query.ambiente;
            const ativo = req.query.ativo;
            const page = req.query.page;
            const perPage = req.query.perPage;

            const option = { //limitar a quantidade máxima por requisição
                nome:(nome),
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
            };

            if (nome){
                //retorno da busca por nome da porta
                const porta = await porta.paginate({nome: new RegExp(nome, "i")}, option);
                const resultPortas = JSON.parse(JSON.stringify(porta));
                return res.status(200).json(resultPortas);
            }

            if (descricao){
                //retorno da busca por descrição da porta
                const porta = await porta.paginate({descricao: new RegExp(descricao, "i")}, option);
                const resultPortas = JSON.parse(JSON.stringify(porta));
                return res.status(200).json(resultPortas);
            }

            if (ambiente){
                //retorno da busca por ambiente da porta
                const porta = await porta.paginate({descricao: new RegExp(ambiente, "i")}, option);
                const resultPortas = JSON.parse(JSON.stringify(porta));
                return res.status(200).json(resultPortas);
            }

            if (ativo){
                //retorno da busca por porta ativa
                const portas = await porta.paginate({ativo: new RegExp(ativo, "i")}, option);
                const resultPortas = JSON.parse(JSON.stringify(porta));
                return res.status(200).json(resultPortas);
            }

            if(nome && descricao && ambiente && ativo){
                //retorno das quatros buscas: nome, descricao, ambiente e ativo da porta
                const porta = await porta.paginate({$and: [{nome: new RegExp(nome, "i")},{descricao: new RegExp(descricao, "i")}, {ativo: new RegExp(ativo, "i")}]}, option);
                const resultPortas = JSON.parse(JSON.stringify(porta));
                return res.status(200).json(resultPortas);
            }

        }catch(erro){
            //retorno do erro caso a solicitação não pode ser atendida.
            console.error(erro);
            res.status(500).json({mensagem: 'Erro ao buscar portas'});

        }
    }
}
