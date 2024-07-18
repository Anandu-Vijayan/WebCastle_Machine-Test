const express = require("express");
const { userSignup, userLogin } = require("../controllers/usersController");
const {
  getAllProducts,
  getSingleProduct,
} = require("../controllers/productController");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);

router.get("/getAllProducts", getAllProducts);
router.get("/getSingleProduct/:id", getSingleProduct);

module.exports = router;
