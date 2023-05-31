import faker from "faker-br";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Rota from "../models/Rota.js"
import Usuario from "../models/Usuario.js";
import GrupoPorta from "../models/GrupoPorta.js";
import GrupoUsuario from "../models/GrupoUsuario.js";
import Porta from "../models/Porta.js";
import { connectDatabase } from "../app.js";

// Conectar com o banco de dados

connectDatabase();

// Gerar número aleatório
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// ------------------------------------------
// Rotas Seed

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

// ------------------------------------------

// Grupo de Usuários

await GrupoUsuario.deleteMany();

let grupoUsuarios = [];


const grupoUsuarios_array = [
  "Administrador",
  "CAED",
  "Diretor"
]

function getNomeGrupoUsuarios(i) {
  return grupoUsuarios_array[i].toString();
}

function seedGrupoUsuarios(qtdGrupoUsuarios) {
  for (let i = 0; i < qtdGrupoUsuarios; i++) {
    const seedGrupoUsuario = {
      nome: getNomeGrupoUsuarios(i),
      descricao: faker.lorem.sentence(),
      ativo: true,
      rotas: rotas,
    }

    grupoUsuarios.push(seedGrupoUsuario);
  }

  return grupoUsuarios;
}

seedGrupoUsuarios(grupoUsuarios_array.length);

await GrupoUsuario.collection.insertMany(grupoUsuarios);
console.log(grupoUsuarios.length + " Grupos de usuários adicionados !")

// // ------------------------------------------------------

// Portas seeds

await Porta.deleteMany();

const portas = [];

const portas_array = [
  "FSLab",
  "CIT",
  "Cozinha"
]

function getNomePortas(i) {
  return portas_array[i].toString();
}

function seedPortas(qtdPortas) {
  for (let i = 0; i < qtdPortas; i++) {
    const seedPorta = {
      descricao: getNomePortas(i),
      ambiente: faker.random.words(),
      ativo: true
    }
    portas.push(seedPorta)
  }

   return portas;
}

seedPortas(portas_array.length);
 await Porta.collection.insertMany(portas);
 console.log(portas.length + " Portas inseridas!")

// ----------------------------------------------------------------

// Grupo de Portas

await GrupoPorta.deleteMany();

const grupoPortas = [];

 const grupoPortas_array = [
   "Professores ADS",
   "Professores Arquitetura",
   "Professores Matemática"
 ]

 function getNomeGrupoPortas(i) {
   return grupoPortas_array[i].toString()
 }

 function seedGrupoPortas(qtdGrupoPortas) {
   for (let i = 0; i < qtdGrupoPortas; i++) {

    const seedGrupoPorta = {
      nome: getNomeGrupoPortas(i),
      descricao: faker.lorem.sentence(),
      ativo: true,
      portas: portas,
      aberto: true
    }

    grupoPortas.push(seedGrupoPorta);
  }

  return grupoPortas;
}

seedGrupoPortas(grupoPortas_array.length);
 await GrupoPorta.collection.insertMany(grupoPortas);
 console.log(grupoPortas.length + " Grupo de portas adicionados !")

 // --------------------------------------------------------------

 // Usuario Seed 

 await Usuario.deleteMany();

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

  for (let i = 0; i < qtdusuarios; i++) {
    let nome = faker.name.firstName();
    let nome_meio = faker.name.lastName();
    let sobrenome = faker.name.lastName();
    let email = `${nome}.${sobrenome}${getRandomInt(1000)}@gmail.com`;

    const seedUsuario = {
      nome: nome + "" + nome_meio + "" + sobrenome,
      email: email.toLocaleLowerCase(),
      senha: senhaHash(),
      ativo: true,
      link_foto: faker.image.avatar(),
      rotas: rotas,
      grupoUsuarios: GrupoUsuario,
      grupoPortas: grupoPortas,
      rfid: "",
      digital: "",
      iris: ""
    }

    usuarios.push(seedUsuario);
  }

  return usuarios;
}

seedUsuario(20);
await Usuario.collection.insertMany(usuarios, { ordered: false });
console.log(usuarios.length + " Usuários inseridos!")

// ------------------------------------------------------------------

// função para encrytar senha usando bcryptjs
function senhaHash() {
  return bcrypt.hashSync('123', 1);
}

// Encerrar a conexão com o banco
await mongoose.connection.close();