import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const rotaSchema = new mongoose.Schema({
  rota: { type: String, required: true, trim: true, index: true },
  dominio: { type: String, required: true, trim: true, index: true },
  ativo: { type: Boolean, required: true },
  verbo_get: { type: Boolean, required: true },
  verbo_post: { type: Boolean, required: true },
  verbo_put: { type: Boolean, required: true },
  verbo_patch: { type: Boolean, required: true },
  verbo_delete: { type: Boolean, required: true }
})

rotaSchema.plugin(mongoosePaginate);

const rotas = mongoose.model("rotas", rotaSchema);

export default rotas;