const fs = require("fs/promises");
const crypto = require("crypto");
const path = require("path");

const filePath = path.join(__dirname, "data", "carts.json");

class CartManager {
    constructor(filePath){
        this.filePath = filePath
    }   
    async #readFile(){
        try{
            const data = await fs.promises.readFile(this.filePath, "utf-8");
            return JSON.parse(data)
        } catch (error){
            if (error.code === "ENOENT") return [];
            throw error;
        }
    }
    async getCartByID(id){
        // HAY QUE HACER LA VALIDACION DEL ID
        try {
            const carts = await this.#readFile();
            const cart = carts.find((c) => c.id === id || null)
            return cart
        } catch (error) {
            console.error("Error al conseguir el carrito: ", error)
        }
    }
    async #writeFile(cart){
            try {
                await fs.writeFile(this.filePath, JSON.stringify(cart, null, 2));
            } catch (error) {
                console.error("Error al escribir el archivo: ", error)
            }
    }
    async addCart({products}){
        try {
            if(!products){
                throw new Error("Debes tener productos seleccionados para crear un nuevo carrito.")
            }
            const carts = await this.#readFile();
            const newCart = {
                id: crypto.randomUUID(),
                products
            };
            carts.push(newCart);
            await this.#writeFile(carts)
            return newCart;
        } catch (error) {
            console.error("Error al crear el carrito: ", error)
        }
    }
    async addProdToCart({product, quantity}) {
        try {
            if (!product || !quantity) {
                throw new Error("No se ha podido agregar el producto.");
            }
            const cart = await this.getCartByID(product);
            const existeProdIndex = cart.findIndex((p) => p.product === product);
            if (existeProdIndex !== -1) {
                cart[existeProdIndex].quantity += quantity;
            } else {
                const newProdToAdd = { 
                    product, 
                    quantity 
                };
                cart.push(newProdToAdd);
            }
            await this.#writeFile(cart);
            return cart;
        } catch (error) {
            console.error("Error al agregar el producto al carrito: ", error);
        }
    }
}