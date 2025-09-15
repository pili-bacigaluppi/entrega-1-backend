const express = require("express");
const router = express.Router();
const {showProdController, showRealTimeController} = require("../controllers/views.controller");

router.get("/home", showProdController);
router.get("/realtimeproducts", showRealTimeController);

module.exports = router;