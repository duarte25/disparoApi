import faker from "faker-br";
import db from "../config/dbConnect.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import rota from "../models/Rota.js";
import usuarios from "../models/Usuario.js";
import grupoPortas from "../models/GrupoPorta.js";
import grupoUsuarios from "../models/GrupoUsuario.js";
import portas from "../models/Porta.js";
import { connectDatabase } from "../app.js";

// Conectar com o banco de dados
connectDatabase();

// Gerar número aleatório
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// ------------------------------------------
// Rotas Seed

await rota.deleteMany();

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
await rota.collection.insertMany(rotas);

console.log(rotas.length + " Rotas inseridas !");


// ------------------------------------------

// Usuario Seed 

await usuarios.deleteMany();

const usuarios = [];

function seedUsuario(qtdusuarios) {
  const usuarioFixo = {
    nome: 'Dev oliveira',
    email: 'dev@gmail.com',
    senha: senhaHash(),
    ativo: true,
    link_foto: faker.image.avatar(),
    rotas: rotas,
    grupoUsuarios: grupoUsuarios,
    grupoPortas: grupoPortas,
    rfid: "",
    digital: "",
    iris: "",
  }
  usuarios.push(usuarioFixo);

  
}


mongoose.connection.close();