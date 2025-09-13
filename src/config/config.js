const path = require("path");
require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 8080,
    paths: {
        views: path.join(__dirname, "../views"),
        public: path.join(__dirname, "../../public"),
        carts: path.join(__dirname, "data", "carts.json"),
        products: path.join(__dirname, "data", "products.json")
    }
}