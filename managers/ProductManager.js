const fs = require("fs/promises");
const crypto = require("crypto");
const path = require("path");

const filePath = path.join(__dirname, "data", "products.json");

class ProductManager {
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
    async #writeFile(products){
        try {
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error("Error al escribir el archivo: ", error)
        }
    }
    async addProduct({title, description, code, price, status = activo, stock = 0 , category, thumbnails}){
        try {
            if(!title || !code || !price || !category || stock < 0){
                throw new Error("Los campos de título, codigo, precio y categoría son obligatorios y el stock debe ser un número válido.")
            }
            const products = await this.#readFile();
            const newProduct = {
                id: crypto.randomUUID(),
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            };
            products.push(newProduct);
            await this.#writeFile(products)
            return newProduct;
        } catch (error) {
            console.error("Error al crear el producto: ", error)
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
    async getProductByID(id){
        // HAY QUE HACER LA VALIDACION DEL ID
        try {
            const products = await this.#readFile();
            const product = products.find((p) => p.id === id || null)
            return product
        } catch (error) {
            console.error("Error al conseguir el producto específico: ", error)
        }
    }
    async deleteProductByID(){
        try {
            const products = await this.#readFile();
            const index = products.findIndex((product) => product.id === id);
            if (index === -1) {
                throw new Error("Producto no encontrado");
            }
            products.splice(index, 1);
            await this.#writeFile(products);
            return { message: "Producto eliminado con éxito" };
        } catch (error) {
            console.error("Error al eliminar el producto: ", error);
        }
    }
    async updateProduct(dataActualizada, id){
        try {
            const products = await this.#readFile();
            const productIndex = products.findIndex((product) => product.id === id);
            if (productIndex === -1) {
                throw new Error("Producto no encontrado");
            }
            const updatedProduct = {
                ...products[productIndex],
                ...dataActualizada, // VER ESTO
            };
            products[productIndex] = updatedProduct; //VER ESTO
            await this.#writeFile(products);
            return updatedProduct;
        } catch (error) {
            console.error("Error al actualizar el producto: ", error);
        }
    }
}

//PARA CREAR UNA NUEVA INSTANCIA
//const filePath = path.join(__dirname, "data", "products.json");
const managerProduct = new ProductManager(filePath);

async function main(){
    console.log( await managerProduct.addProduct(/*{ACA VAN TODOS LOS PARÁMETROS}*/));
    console.log( await managerProduct.getAllProducts());
    console.log( await managerProduct.getProductByID(/*{ACA VA EL ID QUE QUEREMOS BUSCAR}*/))
    console.log( await managerProduct.updateProduct(/*{ACA VA LA DATA A ACTUALIZAR}, ACA VA EL ID DEL PROD A ACTUALIZAR)*/))
    return
}
//main()  --> PARA QUE LO HAGA