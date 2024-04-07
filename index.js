require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const router = require("./routes/routes");
const db = require("./db/conn");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Authorization-Token'');
  next();
});

app.use("/", express.json(), router);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
