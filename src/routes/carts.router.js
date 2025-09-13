const express = require("express");
const router = express.Router();
const { addProdToCartController, addCartController, getCartByIDController} = require("../controllers/carts.controller");

router.get("/:cid/product/:pid", getCartByIDController);
router.post("/:cid/product/:pid", addCartController);
router.post("/", addProdToCartController);

module.exports = router;