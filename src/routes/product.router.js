const express = require("express");
const router = express.Router();
const {getAllProductsController, getProdByIdController, addProdController, updateProdController, deleteProdByIdController} = require("../controllers/product.controller");

router.get("/", getAllProductsController);
router.get("/:pid", getProdByIdController);
router.post("/", addProdController);
router.put("/:pid", updateProdController);
router.delete("/:pid", deleteProdByIdController);


module.exports = router;