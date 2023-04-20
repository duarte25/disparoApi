import mongoose from "mongoose";
import mongoosePaginate from "mongoosePaginate";

const grupoportasSchema = new mongoose.grupoportasSchema({
    
    nome: {
        type: String, 
        trim: true, 
        index: true,
        required: true
     },
    descricao: {
        type: String,
        required: true
     },
     ativo: {
        type: Boolean,
        required: true
     }
})

grupoportasSchema.plugin(mongoosePaginate);

const GrupoPortas = mongoose.model('GrupoPortas', grupoportasSchema);

export default GrupoPortas;