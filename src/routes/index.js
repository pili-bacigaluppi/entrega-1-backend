const express = require("express");
const router = express.Router();

const productsRouter = require("./product.router");
const cartsRouter = require("./carts.router");
const viewsRouter = require("./views.router");

router.use("/", viewsRouter);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);

module.exports = router;