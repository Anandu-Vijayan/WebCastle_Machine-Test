const express = require("express");
const { adminSignup, adminLogin } = require("../controllers/usersController");
const {
  createProduct,
  updateSingleProduct,
  deleteProduct,
} = require("../controllers/productController");
const upload = require("../middleware/fileUplode");
const { adminProtect } = require("../middleware/adminAuthMiddleware");
const { userProtect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/adminSignup", adminSignup);
router.post("/adminLogin", adminLogin);

router.post("/createProduct",adminProtect, upload, createProduct);
router.post("/updateSingleProduct/:id",adminProtect, upload, updateSingleProduct);
router.delete("/deleteProduct/:id", adminProtect,deleteProduct);

module.exports = router;
