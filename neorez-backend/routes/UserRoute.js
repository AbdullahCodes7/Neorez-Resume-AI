const express = require("express");

const {
  userSignUpController,
  userSignInController,
  verifyOtpController,
  forgetPassword,
  resetPassword,
  updatePassword,
  regenerateOtp,
} = require("../controllers/User");

const router = express.Router();

router.post("/signup", userSignUpController);

router.post("/signin", userSignInController);

router.post("/verifyotp", verifyOtpController);

router.post("/forget", forgetPassword);

router.post("/reset-password", resetPassword);

router.post("/change-password", updatePassword);

router.post("/resendotp", regenerateOtp);

module.exports = router;
