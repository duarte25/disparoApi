import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, minlength: 4, maxlength: 200, required: [true, 'Nome é obrigatório.'] },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    senha: { type: String, minlength: 8, trim: true, required: true, select: false },
    link_foto: { type: String, trim: true, index: true, },
    ativo: { type: Boolean, required: true, default: false },
    rfid: { type: String, trim: true },
    iris: { type: String, trim: true },
    digital: [
        {
            digital: { type: String, trim: true }
        }
    ],
    rotas: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "rotas", index: true },
            rota: { type: String, required: true, trim: true, index: true },
            dominio: { type: String, required: true, trim: true, index: true },
            ativo: { type: Boolean, required: true, default: false },
            verbo_get: { type: Boolean, required: true },
            verbo_post: { type: Boolean, required: true },
            verbo_put: { type: Boolean, required: true },
            verbo_patch: { type: Boolean, required: true },
            verbo_delete: { type: Boolean, required: true }
        }
    ],
    grupoPortas: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "grupoPortas", index: true }
        }
    ],

    grupoUsuarios: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "grupoUsuarios", index: true }
        }
    ]
},
    { versionKey: false }
);

usuarioSchema.plugin(mongoosePaginate);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;



