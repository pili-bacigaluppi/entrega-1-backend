const mongoose = require("mongoose");
const Cart = require("../src/models/cart.model");
const path = require("path");

const filePath = path.join(__dirname, "data", "carts.json");

class CartManager {
    constructor(filePath){
        this.filePath = filePath
    }
    async getCartByID(id){
        // HAY QUE HACER LA VALIDACION DEL ID
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("ID no válido");
            }
            const cart = await Cart.findById(id).populate("products.product");
            return cart || null;
        } catch (error) {
            console.error("Error al conseguir el carrito: ", error)
        }
    }
    async addCart({products}){
        try {
            if (!products || !Array.isArray(products)) {
                throw new Error("Debes enviar un array de productos para crear un nuevo carrito.");
            }
            const newCart = new Cart({ products });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error("Error al crear el carrito: ", error)
        }
    }
    async addProdToCart(cartId, productId, quantity) {
        try {
            if (!cartId || !productId || !quantity) {
                throw new Error("Faltan datos para agregar el producto al carrito.");
            }
            if (!mongoose.Types.ObjectId.isValid(cartId)) {
                throw new Error("ID de carrito no válido");
            }
            const cart = await Cart.findById(cartId);
            if (!cart) {
                throw new Error("Carrito no encontrado.");
            }
            const prodIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (prodIndex !== -1) {
                cart.products[prodIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error.message);
        }
    }
}
module.exports = CartManager