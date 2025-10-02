const express = require('express');
const app = express()
const routes = require("./src/routes");
const { paths } = require("./src/config/config");
const mongoose = require("mongoose");

//DOTENV
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

//MONGOOSE
mongoose
    .connect(MONGO_URI)
    .then(()=>{
        console.log("MONGO DB connected.")
    })
    .catch((err) => console.error(err));

//HANDLEBARS
const handlebars = require("express-handlebars");
const { Socket } = require('dgram');
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
app.use("/", routes);
app.use("/static", express.static(paths.public));

module.exports = app;