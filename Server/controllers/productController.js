const Product = require("../models/productDetails");
const path = require('path');

const createProduct = async (req, res) => {
  const { name, price, description, category, stock, ratings } = req.body;
  
 
  const imagePaths = req.files.map((file) => {
    
    return path.basename(file.path); 
  });

  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      stock,
      ratings,
      images: imagePaths,
    });

    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const updateSingleProduct = async (req, res) => {
  const { name, price, description, category, stock, ratings } = req.body;
  const imagePaths = req.files.map((file) => {
    
    return path.basename(file.path); 
  });
  try {
    const id = req.params.id;
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        category,
        stock,
        ratings,
        images: imagePaths,
      },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(updateProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ success: true,message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct,
};
