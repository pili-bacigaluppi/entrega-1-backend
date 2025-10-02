const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true},
    description: { type: String },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: String, default: "activo" },
    stock: { type: Number, default: 0, min: 0 },
    category: { type: String, required: true },
    thumbnails: { type: [String], default: [] }
})

module.exports = mongoose.model("Book", bookSchema);    