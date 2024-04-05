require("dotenv").config();
let User = require("../model/User");
let bcrypt = require('bcrypt');
let salt = Number(process.env.SALT);
let jwt = require('jsonwebtoken');
let validation = require('./validation');

let controller = {
  register: async (req, res) => {

    // Verifica se os dados enviados estão cumprindo as definições de tamanhos de Strings

    const { error } = validation.registerValidation(req.body);
    if (error) return res.status(401).send(error.message);

    let userVerified = await User.findOne({ email: req.body.email });
    if (userVerified) return res.status(401).send("Email already exists");

    let name = req.body.name;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, salt);

    let response = await User.create({ name, email, password });
    response.save();

    res.send("Usuário criado");
  },
  login: async (req, res) => {

    // Verifica se os dados enviados estão cumprindo as definições de tamanhos de Strings
    const { error } = validation.loginValidation(req.body);
    if (error) return res.status(401).send(error.message);

    // Verifica se o usuário existe no banco de dados.

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("Email or password wrong!");

    // Verifica se a senha fornecida é compativel com o hash on banco de dados;
    if (await bcrypt.compare(req.body.password, user.password) == false) return res.status(401).send("Email or password wrong!")

    // Cria token de acesso e o insere no cabeçalho da resposta
    try {
      let token = jwt.sign({ email: req.body.email }, process.env.TOKEN_SECRET, { expiresIn: 600 });

      res.header("authorization-token", token)

      res.status(200).json({
        status: "success",
        data: token
      });

    } catch (err) {
      console.log(err);
    }
  },
  edit: async (req, res) => {
    // Email de quem está tentando fazer a edição
    let validationToken = req.body.validationToken

    // Verifica se o token que está ativo (usuário logado) é administrador, caso não, não possibilita a edição de cadastro
    let userAuth = (await User.findOne({ email: validationToken })).admin;
    if (userAuth === false) return res.status(401).send("Function authorized for administrators only")

    // Verifica se os dados enviados estão cumprindo as definições de tamanhos de Strings
    const { error } = validation.editValidation(req.body);
    if (error) return res.status(401).send(error.message);

    let name = req.body.name;
    let email = req.body.email;

    let user = await User.findOne({ email });

    // Compara se o password antigo não bater com o hash no password cadastrado, retorna com o password antigo errado.
    if (bcrypt.compare(req.body.oldPassword, user.password) === "false") return res.status(401).send("The old password is wrong!")

    let newPassword = await bcrypt.hash(req.body.newPassword, salt);
    let confirmNewPassword = req.body.confirmNewPassword

    // Compara se o password novo digitado e a confirmação do password digitado batem, caso não, retorna como do not match.
    if (req.body.newPassword != confirmNewPassword) return res.status(401).send("Passwords do not match!")

    let response = await User.findOneAndUpdate({ email }, { name, email, password: newPassword });

    res.status(200).json({ status: "success", data: "Dados do usuário editados com sucesso!" });
  },
  auth: async (req, res, next) => {
    // Verifica se existe um token armazenado no header

    let token = req.header("authorization-token");
    if (!token) return res.status(401).send("Access Denied");

    // Caso exista, verifica se esse token é valido, batendo ele com o segredo

    try {
      let validationToken = await jwt.verify(token, process.env.TOKEN_SECRET);

      // Atribui ao user da resposta o resultado da validação
      req.user = validationToken;

      res.status(200).json({ status: "success", data: validationToken });
    } catch (err) {
      res.status(401).send(err);
    }
  },
};

module.exports = controller;