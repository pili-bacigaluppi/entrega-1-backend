//LADO DEL SERVIDOR

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket)=>{
    console.log(`usuario id: ${socket.id} Conectado!`);

    socket.on("jimyConnect", (user)=>{
        console.log(user)
    });

    socket.on("disconnect", (data)=>{
        console.log("--->", data);
        console.log("Cliente desconectado:", socket.id);
    })
});

module.exports = server;