require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_CONNECT_URL = process.env.MONGO_CONNECT_URL;

mongoose.connect(MONGO_CONNECT_URL, {
  dbName: "api_login",
});

let db = mongoose.connection;

db.on("error", () => {
  console.log("Falha ao conectar o banco de dados.");
});

db.once("open", () => {
  console.log("Banco de dados acessado com sucesso!");
});

module.exports = db;
