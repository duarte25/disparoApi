import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const rotaSchema = new mongoose.Schema({
  rota: { type: String, required: [true, "Rota é obrigatório"], trim: true, index: true },
  dominio: { type: String, required: [true, "Domínio é obrigatório"], trim: true, index: true },
  ativo: { type: Boolean, required: [true, "Ativo é obrigatório"] },
  verbo_get: { type: Boolean, required: [true, "Verbo Get é obrigatório"] },
  verbo_post: { type: Boolean, required: [true, "Verbo Post é obrigatório"] },
  verbo_put: { type: Boolean, required: [true, "Verbo Put é obrigatório"] },
  verbo_patch: { type: Boolean, required: [true, "Verbo Patch é obrigatório"] },
  verbo_delete: { type: Boolean, required: [true, "Verbo Delete é obrigatório"] }
},
  { versionKey: false },
);

rotaSchema.plugin(mongoosePaginate);

const rotas = mongoose.model("rotas", rotaSchema);

export default rotas;