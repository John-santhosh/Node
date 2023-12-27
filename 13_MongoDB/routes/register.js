const express = require("express");
const router = express.Router();
// const path = require("path");
const { handleNewUser } = require("../controllers/registerControler");
// const registerController = require("../controllers/registerControler");

router.post("/", handleNewUser);

module.exports = router;
