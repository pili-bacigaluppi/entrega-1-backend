const { paths } = require("../config/config");

const CartManager = require("../../managers/CartManager");

const cartDao = new CartManager(paths.carts);


//FUNC PARA CARRITOS
async function getCartByIDController (req,res) {
    try {
        console.log("GET /:cid fue llamado");
        const cart = await cartDao.getCartByID(req.params.cid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
async function addCartController (req,res) {
    try {
        console.log("POST / fue llamado (cart)");
        const newCart = await cartDao.addCart(req.body, req.params.pid);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
async function addProdToCartController (req,res) {
    try {
        console.log("POST / fue llamado (prod -> cart)");
        const { quantity } = req.body;
        const cartUpdated = await cartDao.addProdToCart(req.params.cid, req.params.pid, quantity);
        res.status(201).json(cartUpdated);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
module.exports = {
    addProdToCartController,
    addCartController,
    getCartByIDController
}