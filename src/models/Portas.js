import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const portasSchema = new mongoose.portasSchema(
    {
        descricao: { 
            type: String, 
            required: true },
        localidade: { 
            type: String, 
            required: true },
        ativo: { 
            type: Boolean, 
            required: true, }
    },

);

portasSchema.plugin(mongoosePaginate);

const portas = mongoose.model('portas', portasSchema);

export default portas;