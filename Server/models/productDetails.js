const mongoose = require("mongoose");

const productDetailsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String], 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductData = mongoose.model("ProductData", productDetailsSchema);

module.exports = ProductData;
