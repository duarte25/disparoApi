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
         
    },

    iris: {
        type: String,
       
    },

    digital: {
        type: String,
       
    },
    digital2: {
        type: String,
       
    },
    digital3: {
        type: String,
        
    },
    
})

usuarioSchema.plugin(mongoosePaginate);

const usuarios = mongoose.model('usuarios', usuarioSchema);

export default usuarios;



