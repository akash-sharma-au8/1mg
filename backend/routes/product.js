const express = require("express");
const router = express.Router();

const { newProduct,getProducts, getSingleProduct,updateProduct } = require("../controllers/product");

router.get("/products", getProducts);
router.post("/admin/product/new", newProduct);
router.get('/product/:id', getSingleProduct);
router.put('/admin/product/:id',updateProduct);

module.exports = router;
