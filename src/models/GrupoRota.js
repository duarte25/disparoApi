import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const grupoUsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true, index: true },
  descricao: { type: String, required: true, trim: true, index: true },
  ativo: { type: Boolean, required: true },
  rotas: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "rotas", index: true },
      rota: { type: String, required: true, trim: true, index: true },
      dominio: { type: String, required: true, trim: true, index: true },
      ativo: { type: Boolean, required: true },
      verbo_get: { type: Boolean, required: true },
      verbo_post: { type: Boolean, required: true },
      verbo_put: { type: Boolean, required: true },
      verbo_patch: { type: Boolean, required: true },
      verbo_delete: { type: Boolean, required: true }
    }
  ]
},

  { versionKey: true }

);

grupoUsuarioSchema.plugin(mongoosePaginate);

const grupoUsuarios = mongoose.model("grupoUsuarios", grupoRotaSchema);

export default grupoUsuarios;