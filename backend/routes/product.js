const express = require("express");
const router = express.Router();

const { newProduct,getProducts } = require("../controllers/product");

router.get("/products", getProducts);
router.post("/products/new", newProduct);

module.exports = router;
