const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  Orders,
  allOrders,
} = require("../controllers/order");

const {
  isUserAuthenticated,
  isUserAuthorized,
} = require("../middlewares/auth");

router.post("/order/new", isUserAuthenticated, newOrder);
router.get("/order/:id", isUserAuthenticated, getSingleOrder);
router.get("/orders", isUserAuthenticated, Orders);
router.get("/admin/orders", isUserAuthenticated, isUserAuthorized('seller'), allOrders);

module.exports = router;
