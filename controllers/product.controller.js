const Product = require("../models/product.model")

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const createProduct = async (req, res) => {
    try {
        const refId = generateRefId()
        const productData = { ...req.body, refId }
        const product = await Product.create(productData);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
function generateRefId() {
    return 'CRT' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
}
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product not found!" })
        }
        const updatedProduct = await Product.findById(id);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found!' });
        }
        return res.status(200).json({ message: 'Product successfully deleted!' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct
}