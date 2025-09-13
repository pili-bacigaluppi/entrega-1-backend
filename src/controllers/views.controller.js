const { paths } = require("../config/config");

const ViewsManager = require("../../managers/ViewsManager");

const viewsDao = new ViewsManager(paths.views);

//FUNC PARA VIEWS
async function showProdController (req,res) {
    try {
        console.log("GET / fue llamado");
        const products = await viewsDao.getAllProducts();
        return res.render("pages/home", {products})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

module.exports = {
    showProdController
}