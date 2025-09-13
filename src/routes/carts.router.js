const express = require("express");
const router = express.Router();
const { addProdToCartController, addCartController, getCartByIDController} = require("../controllers/carts.controller");

router.get("/:cid", getCartByIDController);
router.post("/", addCartController);
router.post("/:cid/product/:pid", addProdToCartController);

module.exports = router;