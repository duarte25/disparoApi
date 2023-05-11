import faker from "faker-br";
import db from "../config/dbConnect.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Rota from "../models/Rota.js";
import { connectDatabase } from "../app.js";

// Conectar com o banco de dados
connectDatabase();

// ------------------------------------------

await Rota.deleteMany();

const rotas = [];

const rotas_array = [
  "rotas",
  "rotas:id",
  "grupoUsuarios",
  "grupoUsuarios:id",
  "grupoPortas",
  "grupoPortas:id",
  "usuarios",
  "usuarios:id",
  "portas",
  "portas:id"
]

function getRotasName(i) {
  return rotas_array[i].toString();
}

function seedRotas(qtdrotas) {
  for (let i = 0; i < qtdrotas; i++) {
    const rota = {
      rota: getRotasName(i),
      dominio: "localhost",
      ativo: true,
      verbo_get: true,
      verbo_post: true,
      verbo_patch: true,
      verbo_put: true,
      verbo_delete: true
    }
    rotas.push(rota)
  }

  return rotas;
}

seedRotas(rotas_array.length);
await Rota.collection.insertMany(rotas);

console.log(rotas.length + " Rotas inseridas !");

mongoose.connection.close();

