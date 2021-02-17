const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  Orders,
  allOrders,
  deleteOrder
} = require("../controllers/order");

const {
  isUserAuthenticated,
  isUserAuthorized,
} = require("../middlewares/auth");

router.post("/order/new", isUserAuthenticated, newOrder);
router.get("/order/:id", isUserAuthenticated, getSingleOrder);
router.get("/orders", isUserAuthenticated, Orders);
router.get("/admin/orders", isUserAuthenticated, isUserAuthorized('seller'), allOrders);
router.delete("/admin/order/:id", isUserAuthenticated, isUserAuthorized('seller'), deleteOrder);

module.exports = router;
