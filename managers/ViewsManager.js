const fs = require("fs/promises");
const crypto = require("crypto");
const path = require("path");

class ViewsManager {
    constructor(filePath){
        this.filePath = filePath
    }
    async #readFile(){
        try{
            const data = await fs.readFile(this.filePath, "utf-8");
            return JSON.parse(data)
        } catch (error){
            if (error.code === "ENOENT") return [];
            throw error;
        }
    }
    async #writeFile(products){
        try {
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error("Error al escribir el archivo: ", error)
        }
    }
    async getAllProducts(){
        try {
            const data = await this.#readFile();
            return data;
        } catch (error) {
            console.error("Error al conseguir todos los productos: ", error);
        }
    }
}
module.exports = ViewsManager;