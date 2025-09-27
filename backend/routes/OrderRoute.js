const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderByAdmin,
  orderClearPayment,
} = require("../controller/OrderCont");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/order/orderClearPayment/:id").post(isAuthenticatedUser, orderClearPayment)
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.route("/admin/updateOrderByAdmin/:id").post(isAuthenticatedUser,authorizeRoles("admin"), updateOrderByAdmin)

module.exports = router;