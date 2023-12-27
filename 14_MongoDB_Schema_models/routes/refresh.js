const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenControler");

router.get("/", refreshTokenController);

module.exports = router;
