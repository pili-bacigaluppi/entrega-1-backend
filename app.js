const express = require('express');
const router = express.Router();
const path = require("path");
const app = express()
const port = 8080
const multer = require("multer");
const routes = require("./src/routes");
const { paths } = require("./src/config/config");
const logger = require("morgan");

//MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    },
    filename: (req, file, cb)=>{
        const originalName = `img-${req.params.id}-${file.originalname}`;
        req.query.filename = originalName;
        cb(null, originalName);
    }
})
const upload = multer({storage: storage});

//EJEMPLO DE FUNCTION, dsp ver como meter en los otros
app.post("/upload/single/:id", upload.single("image"), async(req,res)=>{
    try {
        console.log("--->", req.file);
        res.send(`
            
        `)
    } catch (error) {
        res.send(`imagen ERROR ${error}`);
    }
})
app.post("/upload/multiple/id", upload.array("images", 4), async (req,res)=>{
    try {
        console.log("--->", req.files);
        res.send(`ìmagenes del usuario guardadas: ${req.files.length}`);
    } catch (error) {
        res.send(`imagen ERROR ${error}`);
    }
})

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
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use("/static", express.static(paths.public));
app.use("/uploads", express.static(paths.uploads))

//FUNCION INICIADORA
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente 🚀");
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
