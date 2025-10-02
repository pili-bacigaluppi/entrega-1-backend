const path = require("path");
const mongoose = require("mongoose");
const Book = require("../src/models/book.model");

class ProductManager {
    constructor(filePath){
        this.filePath = filePath
    }
    async addProduct({title, description, code, price, status = "activo", stock = 0 , category, thumbnails}){
    //async addProduct(data){
        try {
            if(!title || !code || !price || !category || stock < 0){
                throw new Error("Los campos de título, codigo, precio y categoría son obligatorios y el stock debe ser un número válido.")
            }
            const newProduct = new Book({ title, description, code, price, status, stock, category, thumbnails });
            //const newProduct = new Product(data);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.error("Error al crear el producto: ", error)
        }
    }
    async getAllProducts(){
        try {
            const books = await Book.find({}, "title description price stock thumbnails");
            return books;
        } catch (error) {
            console.error("Error al conseguir todos los productos: ", error);
        }
    }
    async getProductByID(id){
        try {   
            const product =  await Book.findById(id);
            return product || null;
        } catch (error) {
            console.error("Error al conseguir el producto específico: ", error)
        }
    }
    async deleteProductByID(id){
        try {
            const bookDelete = await Book.findByIdAndDelete(id);
            return bookDelete
        } catch (error) {
            console.error("Error al eliminar el producto: ", error);
        }
    }
    async updateProduct(dataActualizada, id){
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("ID no válido");
        }
        const updateBook = await Book.findByIdAndUpdate(id, dataActualizada, { new: true });
        return updateBook
        } catch (error) {
            console.error("Error al actualizar el producto: ", error);
        }
    }
}
module.exports = ProductManager;