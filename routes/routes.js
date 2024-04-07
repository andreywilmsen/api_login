const express = require("express");
const router = express.Router();
const apiController = require("../controller/userController");

router.post("/login", apiController.login);

router.post("/register", apiController.register);

router.put("/edit", apiController.edit);

router.get("/auth", apiController.auth);

module.exports = router;