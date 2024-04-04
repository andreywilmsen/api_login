require("dotenv").config();
let User = require("../model/User");

let controller = {
  createUser: async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let response = await User.create({ email, password });
    response.save();

    res.send("Usuário criado");
  },
};

module.exports = controller;
