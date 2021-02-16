const express = require("express");
const router = express.Router();

const { newProduct,getProducts, getSingleProduct } = require("../controllers/product");

router.get("/products", getProducts);
router.post("/products/new", newProduct);
router.get('/product/:id', getSingleProduct)

module.exports = router;
