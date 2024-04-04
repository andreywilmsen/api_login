const express = require("express");
const router = express.Router();
const apiController = require("../controller/userController");

router.post("/createUser", apiController.createUser);

module.exports = router;
