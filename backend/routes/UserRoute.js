const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUserDetails,
  updateProfile,
  updatePassword,
  deleteProfile,
  forgotPassword,
  resetPassword,
  getAllUser
} = require("../controller/UserCont");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/sign_up").post(registerUser);
router.route("/sign_in").post(loginUser);
router.route("/sign_out").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/my").get(isAuthenticatedUser, getUserDetails);
router.route("/my/update").put(isAuthenticatedUser, updateProfile);
router.route("/my/delete").delete(isAuthenticatedUser, deleteProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/admin/alluser").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser);


module.exports = router;