require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const router = require("./routes/routes");
const db = require("./db/conn");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Define o cabeçalho para permitir qualquer origem
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Define os métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Define os cabeçalhos permitidos
  next();
});

app.use("/", express.json(), router);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
