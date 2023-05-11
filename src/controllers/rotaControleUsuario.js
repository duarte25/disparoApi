import rota from "../models/GrupoUsuario.js"

export default class rotaControleUsuario {
    static listaGrupousuario = async (req,res)  => {
        try{
            const nome = req.query.nome;
            const descricao = req.query.descricao;
            const ativo = req.query.ativo;
            const rota = req.query.rota;

            const options = {
                page = parseInt(req.query.page) || 1;
                limit = parseInt(req.query.limit) || 10;
            } 
            
        }catch(erro){

        }
    }
}