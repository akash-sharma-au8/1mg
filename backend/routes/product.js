const express = require("express");
const router = express.Router();
const {
  newProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const { isUserAuthenticated,isUserAuthorized } = require("../Middlewares/auth");

//get products/product
router.get("/getproducts", isUserAuthenticated, getProducts);
router.get("/getproduct/:id", getSingleProduct);

//add, delete, update
router.post("/admin/product/create", isUserAuthenticated,isUserAuthorized('seller'), newProduct);

router.put("/admin/updateproduct/:id", isUserAuthenticated, isUserAuthorized('seller'), updateProduct);

router.delete("/admin/deleteproduct/:id", isUserAuthenticated,isUserAuthorized('seller') ,deleteProduct);
module.exports = router;
