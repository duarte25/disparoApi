import usuarios from "../models/Usuario.js";
import grupos from "../models/Grupo.js";


export default class UsuarioController {
    static listarUsuarios = async (req, res) => {
        try {
          
            const nome = req.query.nome;
            const page = req.query.page;
            const perPage = req.query.perPage;
            const options = { 
              nome: (nome),
              page: parseInt(page) || 1,
              limit: parseInt(perPage) > 3 ? 3 : parseInt(perPage) || 3
            };
            if (!nome) {
              
              const usuario = await usuarios.paginate({}, options);
              let user = JSON.parse(JSON.stringify(usuario));
              user.grupos = await grupos.find({ _id: { $in: user.grupos } }).lean();
    
              for (let i = 0; i < user.docs.length; i++) {
                user.docs[i].grupos = await grupos.find({ _id: { $in: user.docs[i].grupos } }).lean();
                for (let j = 0; j < user.docs[i].grupos[j].unidades.length; j++) {
                  user.docs[i].grupos[j].unidades = await unidades.find({ _id: { $in: user.docs[i].grupos[j].unidades } }).lean();
                }
              }
              return res.json(user);
    
            } else {
              
              const usuario = await usuarios.paginate({ nome: new RegExp(nome, 'i') }, options);
              let user = JSON.parse(JSON.stringify(usuario));
              user.grupos = await grupos.find({ _id: { $in: user.grupos } }).lean();
    
              for (let i = 0; i < user.docs.length; i++) {
                user.docs[i].grupos = await grupos.find({ _id: { $in: user.docs[i].grupos } }).lean();
                for (let j = 0; j < user.docs[i].grupos[j].unidades.length; j++) {
                  user.docs[i].grupos[j].unidades = await unidades.find({ _id: { $in: user.docs[i].grupos[j].unidades } }).lean();
                }
              }
              return res.json(user);
            }
          }
         catch (err) {
          console.error(err);
          return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
      }
}