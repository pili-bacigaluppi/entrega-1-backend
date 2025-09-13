const { paths } = require("../config/config");

const ProductManager = require("../../managers/ProductManager");

const booksDao = new ProductManager(paths.products);

//FUNC PARA PRODUCTOS
async function getAllProductsController (req,res) {
    try {
        console.log("GET / fue llamado");
        const products = await booksDao.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
async function getProdByIdController (req,res) {
    try {
        console.log("GET /:pid fue llamado");
        const product = await booksDao.getProductByID(req.params.pid);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
async function addProdController (req,res) {
    try {
        console.log("POST / fue llamado");
        const nuevoProducto = await booksDao.addProduct(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
async function updateProdController (req,res) {
    try {
        console.log("PUT /:pid fue llamado");
        const actualizado = await booksDao.updateProduct(req.body, req.params.pid);
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
async function deleteProdByIdController (req,res) {
    try {
        console.log("DELETE /:pid fue llamado");
        const resultado = await booksDao.deleteProductByID(req.params.pid);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}
module.exports = {
    getAllProductsController,
    getProdByIdController,
    addProdController,
    updateProdController,
    deleteProdByIdController
}