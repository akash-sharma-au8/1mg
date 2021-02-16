const express = require("express");
const router = express.Router();

const {
  newProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

router.get("/getproducts", getProducts);
router.post("/admin/product/create", newProduct);
router.get("/getproduct/:id", getSingleProduct);
router.put("/admin/updateproduct/:id", updateProduct);
router.delete("/admin/deleteproduct/:id", deleteProduct);
module.exports = router;
