const express = require("express");
const path = require("path");

const authController = require(path.join(
  __dirname,
  "../controllers/authController"
));

const userController = require(path.join(
  __dirname,
  "../controllers/userController"
));


const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/checkAuth").get(authController.isLoggedIn);

router.route("/profile").get(authController.protect, userController.getUser);

router.route("/:id").get(userController.getUserById);

router
  .route("/deleteMe")
  .delete(authController.protect, authController.deleteMe);

router
.route("/update")
.patch(authController.protect, userController.updateUserSchema);

router.route("/updateMe").patch(authController.protect, userController.updateNameEmail);


router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

router.route("/contact").post(authController.contactUs);

module.exports = router;
