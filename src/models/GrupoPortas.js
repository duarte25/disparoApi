import mongoose from "mongoose";
import mongoosePaginate from "mongoosePaginate";

const grupoPortaSchema = new mongoose.Schema({
   nome: { type: String, required: true, trim: true, index: true },
   descricao: { type: String, required: true, trim: true, index: true },
   ativo: { type: Boolean, required: true },
   portas: [
      {
         _id: { type: mongoose.Schema.Types.ObjectId, ref: "portas", index: true }
      }
   ],
   aberto: { type: Boolean, required: true }
},
   { versionKey: false },
);

grupoPortaSchema.plugin(mongoosePaginate);

const grupoPortas = mongoose.model('grupoPortas', grupoPortaSchema);

export default grupoPortas;