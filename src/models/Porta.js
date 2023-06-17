import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const portaSchema = new mongoose.Schema({
    descricao: { type: String, required: [true, "Descrição é obrigatório"], trim: true, index: true },
    ambiente: { type: String, required: [true, "Ambiente é obrigatório"], trim: true, index: true },
    ativo: { type: Boolean, required: [true, "Ativo é obrigatório"] }
},
    { versionKey: false }
);

portaSchema.plugin(mongoosePaginate);

const portas = mongoose.model('portas', portaSchema);

export default portas;