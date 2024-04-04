require("dotenv").config();
let User = require("../model/User");
let bcrypt = require('bcrypt');
let salt = Number(process.env.SALT);

let controller = {
  createUser: async (req, res) => {
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, salt);

    let response = await User.create({ email, password });
    response.save();

    res.send("Usuário criado");
  },
  login: async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found!");

    let hash = user.password;
    let validPassword = await bcrypt.compare(password, hash);

    if (!validPassword) return res.status(404).send("Email or password wrong!")

    res.send(validPassword);
  },
};

module.exports = controller;
