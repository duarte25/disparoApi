import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const usuarioSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        minlength: 4, 
        maxlength: 200, 
        required: [true, 'Nome é obrigatório.'] 
    },

    email:{
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    senha: { 
        type: String, 
        minlength: 8, 
        trim: true, 
        required: true, 
        select: false
     },
        
    link_foto: { 
        type: String, 
        trim: true 
    },

    ativo: { 
        type: Boolean, 
        required: true, 
        default: false 
    },

    rfid: {
        type: String,
        required: true, 
        default: false 
    },

    iris: {
        type: String,
        required: true, 
        default: false
    },

    digital: {
        type: String,
        required: true, 
        default: false
    },
    digital2: {
        type: String,
        required: true, 
        default: false
    },
    digital3: {
        type: String,
        required: true, 
        default: false
    },
    
    rotas: [
	 {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'rotas' },
            rota: { type: String, required: true, trim: true },
            ativo: { type: Boolean },
            verbo_get: { type: Boolean },
            verbo_put: { type: Boolean },
            verbo_patch: { type: Boolean },
            verbo_delete: { type: Boolean },
            verbo_post: { type: Boolean }
        }
    ],

    grupos: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'grupos' }
        }
    ]
},     
    
);

usuarioSchema.plugin(mongoosePaginate);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;


