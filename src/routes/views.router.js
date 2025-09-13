const express = require("express");
const router = express.Router();
const {showProdController} = require("../controllers/views.controller");

router.get("/home", showProdController);
//router.get("/realtimeProducts", showProdController);

module.exports = router;