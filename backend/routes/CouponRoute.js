const express = require("express");
const {
  createCoupon,
  deleteCoupon,
  getAllCouponsAdmin,
  getAllCoupons,
  validateCoupon
} = require("../controller/CouponCont");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();
router.route("/coupons")
  .get(getAllCoupons);
router.route("/validate/coupon/:id")
  .get(validateCoupon);
router.route("/admin/coupons")
  .get(isAuthenticatedUser,authorizeRoles("admin"), getAllCouponsAdmin);

router
  .route("/admin/coupon/new")
  .post(isAuthenticatedUser,authorizeRoles("admin"), createCoupon);
  
router
  .route("/admin/coupon/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCoupon);
module.exports = router;