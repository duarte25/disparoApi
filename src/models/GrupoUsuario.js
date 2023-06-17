import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const grupoUsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: [true, "Nome é obrigatório"], trim: true, index: true },
  descricao: { type: String, required: [true, "Descrição é obrigatório"], trim: true, index: true },
  ativo: { type: Boolean, required: [true, "Ativo é obrigatório"] },
  rotas: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "rotas", index: true },
      rota: { type: String, required: [true, "Rota é obrigatório"], trim: true, index: true },
      dominio: { type: String, required: [true, "Domínio é obrigatório"], trim: true, index: true },
      ativo: { type: Boolean, required: [true, "Ativo é obrigatório"] },
      verbo_get: { type: Boolean, required: [true, "Verbo Get é obrigatório"] },
      verbo_post: { type: Boolean, required: [true, "Verbo Post obrigatório"] },
      verbo_put: { type: Boolean, required: [true, "Verbo Put é obrigatório"] },
      verbo_patch: { type: Boolean, required: [true, "Verbo Patch é obrigatório"] },
      verbo_delete: { type: Boolean, required: [true, "Verbo Delete é obrigatório"] }
    }
  ]
},

  { versionKey: false }

);

grupoUsuarioSchema.plugin(mongoosePaginate);

const grupoUsuarios = mongoose.model("grupoUsuarios", grupoUsuarioSchema);

export default grupoUsuarios;