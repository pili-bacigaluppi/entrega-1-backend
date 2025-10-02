const mongoose = require("mongoose");
const Book = require("../src/models/book.model");
const path = require("path");

class ViewsManager {
    constructor(filePath){
        this.filePath = filePath
    }
    async getAllProducts(){
        try {
            const books = await Book.find({}, "title description price stock thumbnails").lean();
            return books;
        } catch (error) {
            console.error("Error al conseguir todos los productos: ", error);
        }
    }
    async getProductByID(id){
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("ID no válido");
            }
            const product = await Book.findById(id, "title description price stock thumbnails");
            return product || null;
        } catch (error) {
            console.error("Error al conseguir el producto específico: ", error);
        }
    }
}
module.exports = ViewsManager;