const express = require("express");
const { userSignup, userLogin } = require("../controllers/usersController");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateSingleProduct,
  deleteProduct,
} = require("../controllers/productController");
const upload = require("../middleware/fileUplode");
const { userProtect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/createProduct" ,userProtect ,upload, createProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getSingleProduct/:id",userProtect , getSingleProduct);
router.put("/updateSingleProduct/:id",userProtect, upload, updateSingleProduct);
router.delete("/deleteProduct/:id", userProtect,deleteProduct);
module.exports = router;
