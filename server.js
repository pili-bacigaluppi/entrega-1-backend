// server.js
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const { paths } = require("./src/config/config");
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

const ProductManager = require("./managers/ProductManager");
const productManager = new ProductManager(paths.products);

//SOCKET IO
io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
    // CREA PROD
    socket.on("crearProducto", async (producto) => {
        try {
        const nuevoProducto = await productManager.addProduct(producto);
        io.emit("productoNuevo", nuevoProducto);
        } catch (error) {
        console.error("Error al crear producto:", error.message);
        }
    });
    // ELIMINA PROD
    socket.on("eliminarProducto", async (id) => {
        try {
        const eliminado = await productManager.deleteProductByID(id);
        if (eliminado) {
            io.emit("productoEliminado", id);
        }
        } catch (error) {
        console.error("Error al eliminar producto:", error.message);
        }
    });
    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

// Levantar servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
