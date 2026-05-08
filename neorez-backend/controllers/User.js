const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const {
  generateOTP,
  sendOTPEmail,
  storeOTP,
  verifyOTP,
  clearOTP,
} = require("../utils/otp");

function createToken(user) {
  const payload = {
    id: user._id,
    googleId: user.googleId,
    userName: user.userName,
    email: user.email,
    isVerified: user.isVerified,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

// SIGNUP
async function userSignUpController(req, res) {
  try {
    const { email, password, confirmPassword, name } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();

    await sendOTPEmail(email, otp);

    storeOTP(email, otp);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful. OTP sent to email.",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// VERIFY OTP
async function verifyOtpController(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP required",
      });
    }

    const verification = verifyOTP(email, otp);

    if (!verification.valid) {
      return res.status(400).json({
        success: false,
        message: verification.message,
      });
    }

    await userModel.findOneAndUpdate(
      { email },
      {
        isVerified: true,
      },
    );

    clearOTP(email);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// LOGIN
async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.googleId) {
      return res.status(400).json({
        success: false,
        message: "Please login with Google",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = createToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// FORGET PASSWORD
async function forgetPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = generateOTP();

    await sendOTPEmail(email, otp);

    storeOTP(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
}

// RESET PASSWORD
async function resetPassword(req, res) {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const verification = verifyOTP(email, otp);

    if (!verification.valid) {
      return res.status(400).json({
        success: false,
        message: verification.message,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      },
    );

    clearOTP(email);

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// UPDATE PASSWORD
async function updatePassword(req, res) {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Incorrect old password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// RESEND OTP
async function regenerateOtp(req, res) {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = generateOTP();

    await sendOTPEmail(email, otp);

    storeOTP(email, otp);

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = {
  userSignUpController,
  verifyOtpController,
  userSignInController,
  forgetPassword,
  resetPassword,
  updatePassword,
  regenerateOtp,
};
