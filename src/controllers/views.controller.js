const { paths } = require("../config/config");

const ViewsManager = require("../../managers/ViewsManager");

const viewsDao = new ViewsManager(paths.products);

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
async function showRealTimeController(req, res) {
    try {
        const products = await viewsDao.getAllProducts();
        return res.render("pages/realtimeProducts", {products});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    showProdController,
    showRealTimeController
}