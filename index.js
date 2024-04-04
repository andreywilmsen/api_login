require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const router = require("./routes/routes");
// Conexão com o banco de dados
const db = require("./db/conn");

app.use("/", express.json(), router);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
