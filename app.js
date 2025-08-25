const express = require('express');
const router = express.Router();
const path = require("path");
const app = express()
const port = 8080
const ProductManager = require("./managers/ProductManager");
const CartManager = require("./managers/CartManager")
const filePathP = path.join(__dirname, "data", "products.json");
const filePathC = path.join(__dirname, "data", "carts.json");

const booksDao = new ProductManager(filePathP);
const cartDao = new CartManager(filePathC);

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//FUNCION INICIADORA
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

//FUNCIONES PARA PRODUCTOS
app.get("/api/products/", async (req, res) => {
    console.log("GET / fue llamado");
    const products = await booksDao.getAllProducts();
    res.json(products);
});

app.get("/api/products/:pid", async (req, res) => {
    console.log("GET /:pid fue llamado");
    const product = await booksDao.getProductByID(req.params.pid);
    res.json(product);
});

app.post("/api/products/", async (req, res) => {
    console.log("POST / fue llamado");
    const nuevoProducto = await booksDao.addProduct(req.body);
    res.status(201).json(nuevoProducto);
});

app.put("/api/products/:pid", async (req, res) => {
    console.log("PUT /:pid fue llamado");
    const actualizado = await booksDao.updateProduct(req.body, req.params.pid);
    res.json(actualizado);
});

app.delete("/api/products/:pid", async (req, res) => {
    console.log("DELETE /:pid fue llamado");
    const resultado = await booksDao.deleteProductByID(req.params.pid);
    res.json(resultado);
});

//FUNCIONES PARA CARRITO
app.get("/api/carts/:cid", async (req, res) => {
    console.log("GET /:cid fue llamado");
    const cart = await cartDao.getCartByID(req.params.cid);
    res.json(cart);
});

app.post("/api/carts/", async (req, res) => {
    console.log("POST / fue llamado (cart)");
    const newCart = await cartDao.addCart(req.body, req.params.pid);
    res.status(201).json(newCart);
});

app.post("/api/carts/:cid/product/:pid", async (req, res) => {
    console.log("POST / fue llamado (prod -> cart)");
    const { quantity } = req.body;
    const cartUpdated = await cartDao.addProdToCart(req.params.cid, req.params.pid, quantity);
    res.status(201).json(cartUpdated);
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

