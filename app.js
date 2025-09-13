const express = require('express');
const router = express.Router();
const path = require("path");
const app = express()
const port = 8080

const routes = require("./src/routes");
const { paths } = require("./src/config/config");

//HANDLEBARS
const handlebars = require("express-handlebars");
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
    })
)
app.set("view engine", "hbs");
app.set("views", paths.views);


//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use(express.static(paths.public))


//FUNCION INICIADORA
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
