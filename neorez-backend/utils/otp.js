require("dotenv").config();
const nodemailer = require("nodemailer");

// store OTPs temporarily
const otpStore = new Map();

// generate 6 digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// send email
const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      html: `
      <div style="font-family: Arial; padding:20px;">
        <h2>OTP Verification</h2>

        <p>Your OTP code is:</p>

        <h1 style="color:primary; letter-spacing:5px;">
          ${otp}
        </h1>

        <p>This OTP will expire in 10 minutes.</p>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.log("Email Error:", error);
    throw error;
  }
};

// store otp
const storeOTP = (email, otp) => {
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });
};

// verify otp
const verifyOTP = (email, otp) => {
  const storedOTP = otpStore.get(email);

  if (!storedOTP) {
    return {
      valid: false,
      message: "OTP not found",
    };
  }

  if (Date.now() > storedOTP.expiresAt) {
    otpStore.delete(email);

    return {
      valid: false,
      message: "OTP expired",
    };
  }

  if (storedOTP.otp !== otp) {
    return {
      valid: false,
      message: "Invalid OTP",
    };
  }

  return {
    valid: true,
    message: "OTP verified successfully",
  };
};

// clear otp
const clearOTP = (email) => {
  otpStore.delete(email);
};

module.exports = {
  generateOTP,
  sendOTPEmail,
  storeOTP,
  verifyOTP,
  clearOTP,
};
