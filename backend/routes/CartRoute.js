const express = require("express");
const {
  newCart,
  getSinglecart,
  mycarts,
  deleteCart,
  getAllcarts,
  addQuantityCart,
  removeQuantityCart,
  cartClearPayment,
} = require("../controller/cartCont");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
router.route("/cart/new").post(isAuthenticatedUser,authorizeRoles("user"), newCart);
router.route("/cart/:id").get(isAuthenticatedUser,authorizeRoles("user"), getAllcarts);
router.route("/cart/quantity/add").post(isAuthenticatedUser,authorizeRoles("user"), addQuantityCart);
router.route("/cart/quantity/remove").post(isAuthenticatedUser,authorizeRoles("user"), removeQuantityCart);
router.route("/cart/delete").post(isAuthenticatedUser,authorizeRoles("user"), deleteCart);
// router.route("/cart/:id").get(isAuthenticatedUser, getSinglecart);
// router.route("/carts/me").get(isAuthenticatedUser, mycarts);
// router.route("/cart/cartClearPayment/:id").post(isAuthenticatedUser, cartClearPayment)
// router
//   .route("/admin/carts")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getAllcarts);
// router.route("/admin/updatecartByAdmin/:id").post(isAuthenticatedUser,authorizeRoles("admin"), updatecartByAdmin)

module.exports = router;