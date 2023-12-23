const express = require("express");
const router = express.Router();
// const path = require("path");
// const { handleNewUser } = require("../controllers/registerControler");
// const registerController = require("../controllers/registerControler");
const { handleLogin } = require("../controllers/authController");

router.post("/", handleLogin);

module.exports = router;
