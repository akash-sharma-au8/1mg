const express = require("express");
const router = express.Router();
const {
  newProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} = require("../controllers/product");

const { isUserAuthenticated,isUserAuthorized } = require("../Middlewares/auth");

//get products/product
router.get("/getproducts", getProducts);
router.get("/getproduct/:id", getSingleProduct);

router.get('/admin/products',getAdminProducts);
//add, delete, update
router.post("/admin/product/create", isUserAuthenticated,isUserAuthorized('seller'), newProduct);

router.put("/admin/updateproduct/:id", isUserAuthenticated, isUserAuthorized('seller'), updateProduct);

router.delete("/admin/deleteproduct/:id", isUserAuthenticated,isUserAuthorized('seller') ,deleteProduct);
module.exports = router;
