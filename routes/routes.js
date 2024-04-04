const express = require("express");
const router = express.Router();
const apiController = require("../controller/userController");

router.get("/login", apiController.login);

router.post("/createUser", apiController.createUser);

router.get("/auth", apiController.auth);


module.exports = router;
