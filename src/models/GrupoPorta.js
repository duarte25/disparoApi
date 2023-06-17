import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const grupoPortaSchema = new mongoose.Schema({
   nome: { type: String, required: [true, "Nome é obrigatório"], trim: true, index: true },
   descricao: { type: String, required: [true, "Descrição é obrigatório"], trim: true, index: true },
   ativo: { type: Boolean, required: [true, "Ativo é obrigatório"] },
   portas: [
      {
         _id: { type: mongoose.Schema.Types.ObjectId, ref: "portas", index: true }
      }
   ],
   aberto: { type: Boolean, required: [true, "Aberto é obrigatório"] }
},
   { versionKey: false },
);

grupoPortaSchema.plugin(mongoosePaginate);

const grupoPortas = mongoose.model('grupoPortas', grupoPortaSchema);

export default grupoPortas;