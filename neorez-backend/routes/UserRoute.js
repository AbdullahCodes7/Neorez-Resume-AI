const express = require("express")
const { userSignUpController, userSignInController, verifyOtpController, findOneUser, forgetPassword, resetPassword, updateUser, updatePassword, loginwithgoogle, regenerateOtp } = require("../controllers/User")

const app = express()

const router = express.Router()

router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.post("/verifyotp", verifyOtpController)
router.get("/:id", findOneUser);
router.post("/forget", forgetPassword);
router.post("/", updatePassword);
router.post("/resendotp", regenerateOtp);
router.post("/reset-password", resetPassword);
router.put("/update/:user_id", updateUser);
router.post("/loginwithgoogle", loginwithgoogle);



module.exports = router