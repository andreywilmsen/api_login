require("dotenv").config();
let User = require("../model/User");
let bcrypt = require('bcrypt');
let salt = Number(process.env.SALT);
let jwt = require('jsonwebtoken');

let controller = {
  createUser: async (req, res) => {
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, salt);

    let response = await User.create({ email, password });
    response.save();

    res.send("Usuário criado");
  },
  login: async (req, res) => {

    // Verifica se o usuário existe no banco de dados.

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("Email or password wrong!");

    // Verifica se a senha fornecida é compativel com o hash on banco de dados;
    if (await bcrypt.compare(req.body.password, user.password) == false) return res.status(401).send("Email or password wrong!")

    // Cria token de acesso e o insere no cabeçalho da resposta
    try {
      let token = jwt.sign({ email: req.body.email }, process.env.TOKEN_SECRET, { expiresIn: 60 });
      res.header("authorization-token", token)
      res.send("User logged");

    } catch (err) {
      console.log(err);
    }
  },
  auth: async (req, res, next) => {

    // Verifica se existe um token armazenado no header

    let token = req.header("authorization-token");
    if (!token) return res.status(401).send("Access Denied");

    // Caso exista, verifica se esse token é valido, batendo ele com o segredo

    try {
      let validation = jwt.verify(req.header("authorization-token"), process.env.TOKEN_SECRET);

      // Atribui ao user da resposta o resultado da validação

      res.user = validation;

      //  Envia o usuario como resposta e avança para o proximo midware se existir

      res.send(res.user)
      next();

    } catch (err) {
      res.status(401).send(err);
    }
  },
};

module.exports = controller;
