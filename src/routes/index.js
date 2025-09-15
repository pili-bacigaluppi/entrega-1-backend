const express = require("express");
const router = express.Router();

const productsRouter = require("./product.router");
const cartsRouter = require("./carts.router");
const viewsRouter = require("./views.router");

router.use("/", viewsRouter);
router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);

module.exports = router;