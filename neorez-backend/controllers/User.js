const userModel = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const MailService = require('@sendgrid/mail');
const { default: mongoose } = require("mongoose");
const { uploadFileToAWS, deleteFileFromAWS } = require("../utils/AWS");
// console.log("Process",process.env.SENDGRID_SENDER_EMAIL)

MailService.setApiKey(process.env.SENDGRID_API_KEY)

function createToken(user) {
    const payload = {
        id: user._id,
        googleId: user.googleId,
        userName: user.userName,
        email: user.email,
        isVerified: user.isVerified,

    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return token;
}


async function userSignUpController(req, res) {
    try {
        const { email, password, confirmPassword } = req.body;
        let role = "user"
        // console.log(req.body);

        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "User already exists.",
                success: false,
                error: true,
            });
        }

        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                success: false,
                error: true,
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                success: false,
                error: true,
            });
        }
        if (!confirmPassword == password) {
            return res.status(400).json({
                message: "Passwords do not match",
                success: false,
                error: true,
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            return res.status(500).json({
                message: "Something went wrong during password hashing",
                success: false,
                error: true,
            });
        }

        // Generate a 4-digit OTP
        const generatedOtp = Math.floor(1000 + Math.random() * 9000);

        // Check if the OTP from the request matches the generated OTP
        // if (generatedOtp !== otp) {
        //     throw new Error("OTP mismatched");
        // }
        const payload = {
            email,
            password: hashPassword,
            role: role,
            otp: generatedOtp,
            otpExpiresIn: Date.now() + 300000, // OTP expires after 5 minutes (300000 milliseconds)
        };

        const userData = new userModel(payload);
        await sendEmail(email, generatedOtp)

        await userData.save();

        res.status(201).json({
            userData,
            success: true,
            error: false,
            message: "User created successfully!",
            otp: generatedOtp, // Optionally send the OTP back to the client
        });

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

async function sendEmail(email, generatedOtp) {
    try {

        // console.log("email:", email);
        console.log("process.env.SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY);
        // console.log("generatedOtp", generatedOtp);
        // console.log(MailService)
        const msg = {
            to: email,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: "One Time Password",
            html: ` <p>Hello Your One Time Security Code </p>
                <p>OTP code is:</p>
               <h3>${generatedOtp}</h3>`,
        };
        MailService
            .send(msg)
            .then(() => {
                console.log("Email sent successfully");

            })
            .catch((error) => console.error("errror", error));
        return;
    } catch (error) {
        console.error("btm errrrr", error);
        return res.status(500).json({ message: "Internal server error", error: true, success: false });
    }
}

// async function sendEmail(email, generatedOtp) {
//     try {
//         const msg = {
//             to: email,
//             from: process.env.SENDGRID_SENDER_EMAIL, 
//             subject: "One Time Password",
//             html: `<p>Hello, your One Time Security Code</p><p>OTP code is:</p><h3>${generatedOtp}</h3>`,
//         };

//         // Send the email using SendGrid
//          MailService.send(msg).then((res=>{
//             console.log("res",res)
//         })).catch((err=>{
//             console.log(err)
//         }));
//         // console.log('Email sent successfully:', response);

//     } catch (error) {
//         console.error("Error sending email:", error);
//         return res.status(500).json({ message: "Internal server error", error: true, success: false });
//     }
// }


async function verifyOtpController(req, res) {
    try {
        const { email, otp } = req.body;

        // console.log("email", email)
        // console.log("otp", otp)

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
                success: false,
                error: true,
            });
        }

        const user = await userModel.findOne({ email });
        // console.log(user);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true,
            });
        }
        // Check if the OTP has expired
        const currentTime = Date.now();
        // console.log("Current Time:", currentTime);
        // console.log("OTP Expires In:", user.otpExpiresIn);
        // console.log(currentTime > user.otpExpiresIn);

        if (currentTime > user.otpExpiresIn) {
            return res.status(400).json({
                message: "OTP has expired",
                success: false,
                error: true,
            });
        }

        if (user.otp == otp) {
            user.otp = "";
            user.otpExpiresIn = "";
            user.isVerified = true
            await user.save();

            return res.status(200).json({
                message: "OTP verified successfully",
                success: true,
                error: false,
            });
        } else {
            return res.status(400).json({
                message: "Invalid OTP",
                success: false,
                error: true,
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message || "An error occurred during OTP verification",
            success: false,
            error: true,
        });
    }
}

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body

        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                success: false,
                error: true,
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                success: false,
                error: true,
            });
        }
        const user = await userModel.findOne({ email })

        // Check if the user is registered with Google
        if (user.googleId) {
            return res.status(400).json({
                message: "This account was registered with Google. Please login using Google.",
                success: false,
                error: true,
            });
        }
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true,
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (checkPassword) {
            const tokenData = {
                userId: user._id,
                email: user.email,
            }
            const token = await createToken(user);


            res.status(200).json({
                message: "Login successfully",
                data: user,
                token: token,
                success: true,
                error: false
            })

        } else {
            return res.status(400).json({
                message: "Please check Password",
                success: false,
                error: true,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        })
    }

}

// async function forgetPassword(req, res) {
//     try {
//         const { email } = req.body;
//         // console.log(req.body);

//         if (!email) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "Email is required" });
//         }
//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res
//                 .status(404)
//                 .json({ message: "User not found", success: false });
//         }

//         const otp = Math.floor(1000 + Math.random() * 9000);
//         const otpExpiresIn = Date.now() + 300000; // 5 minutes expiry
//         // console.log(`Comparing OTP: ${user.otp} with received OTP: ${otp}`);
//         // console.log(`Expiration time: ${user.otpExpiresIn}, Current time: ${Date.now()}`);
//         user.otp = otp;
//         user.otpExpiresIn = otpExpiresIn;
//         await user.save();
//         // console.log(otp, otpExpires, email);
//         console.log("SendGrid Key exists:", !!process.env.SENDGRID_API_KEY);
//         console.log("Sender Email:", process.env.SENDGRID_SENDER_EMAIL);
//         const msg = {
//             to: email,
//             from: process.env.SENDGRID_SENDER_EMAIL,
//             subject: "Test password",
//             html: ` <p>Hello</p>
//                 <p>OTP code is:</p>
//                <h3>${otp}</h3>`,
//         };
//         MailService
//             .send(msg)
//             .then(() => {
//                 console.log("Email sent successfully ");

//             })
//             .catch((error) => console.error("errror", error));
//         // return;

//         return res
//             .status(200)
//             .json({ message: "OTP Send successfully", success: true });

//     } catch (error) {
//         console.error(error);
//         return res
//             .status(500)
//             .json({ message: "Internal server error", success: false });
//     }
// }

async function forgetPassword(req, res) {
    try {
        const { email } = req.body;
        console.log("Forget password request for:", email);

        if (!email) {
            return res
                .status(400)
                .json({ success: false, message: "Email is required" });
        }
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found", success: false });
        }

        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpiresIn = Date.now() + 300000; // 5 minutes expiry
        
        user.otp = otp;
        user.otpExpiresIn = otpExpiresIn;
        await user.save();
        
        // Log environment variable status (for debugging)
        console.log("SendGrid Key exists:", !!process.env.SENDGRID_API_KEY);
        console.log("Sender Email:", process.env.SENDGRID_SENDER_EMAIL);

        const msg = {
            to: email,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: "Password Reset OTP",
            html: `<p>Hello,</p>
                <p>Your password reset OTP code is:</p>
                <h3>${otp}</h3>
                <p>This code will expire in 5 minutes.</p>`,
        };
        
        try {
            const response = await MailService.send(msg);
            console.log("Email sending response:", response);
            console.log("Email sent successfully to:", email);
            
            return res
                .status(200)
                .json({ message: "OTP sent successfully", success: true });
        } catch (emailError) {
            console.error("SendGrid Error details:", emailError.response ? emailError.response.body : emailError);
            // Optionally revert the OTP save if email fails
            user.otp = null;
            user.otpExpiresIn = null;
            await user.save();
            
            return res
                .status(500)
                .json({ 
                    message: "Failed to send OTP email. Please try again.", 
                    success: false,
                    error: emailError.message 
                });
        }

    } catch (error) {
        console.error("Forget password error:", error);
        return res
            .status(500)
            .json({ message: "Internal server error", success: false });
    }
}

async function resetPassword(req, res) {
    try {
        const { email, otp, password } = req.body;

        // Log the incoming request body for debugging
        // console.log(req.body);

        // Validate that all required fields are present
        if (!email || !otp || !password) {
            return res.status(400).json({
                success: false,
                message: "Email, password, and OTP are required",
            });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });

        // Log the user object for debugging
        // console.log(user);

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare the OTP and check if it has expired
        // console.log(`Comparing OTP: ${user.otp} with received OTP: ${otp}`);
        // console.log(`Expiration time: ${user.otpExpiresIn}, Current time: ${Date.now()}`);

        if (String(user.otp) !== String(otp) || Date.now() > user.otpExpiresIn) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP",
            });
        }

        // console.log(user.otp);
        // console.log(otp);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.otp = null;
        user.otpExpiresIn = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}


//Update Password
async function updatePassword(req, res) {
    try {


        // console.log(req.body);

        const { email, oldPassword, newPassword } = req.body;


        // Valemailate input
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email, old password, and new password are required",
            });
        }

        // Find the user
        const user = await userModel.findOne({ email });
        // console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        // if (oldPassword !== newPassword) {
        //     return res.status(400).json({ message: "Old and new password cannot be the same" })
        // }
        // Compare the old password with the stored hashed password
        const isMatch = await bcrypt.compare(oldPassword, user.password);



        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect old password", success: false });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password updated successfully", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await userModel.find();
        if (users.length === 0) {
            return res.status(200).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function findOneUser(req, res) {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ message: "Invalid User ID format", success: false });
        }
        const user = await userModel.findById(id);
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found", success: false });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Internal server error", success: false });
    }
}


async function updateUser(req, res) {
    const { user_id } = req.params;
    const { name, email, image } = req.body; // 'image' could be a base64 string or URL
    let imageUrl;

    try {
        // Validate User ID
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: "Invalid User ID format", success: false });
        }

        // Find the user by ID
        const user = await userModel.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }


        // Check if the incoming image is in base64 format
        if (image && image.startsWith('data:')) {
            // If an old image exists, delete it from AWS
            if (user.image && typeof user.image === 'string' && user.image.startsWith('https://')) {
                try {
                    await deleteFileFromAWS(user.image);
                } catch (err) {
                    console.error('Error deleting old image from AWS:', err);
                }
            }
            // Extract MIME type and base64 data from the new image
            const mimeType = image.match(/data:(.*?);base64,/)[1];
            const base64ImageData = image.replace(/^data:.*;base64,/, '');
            const buffer = Buffer.from(base64ImageData, 'base64');
            const fileName = `${name}.${mimeType.split('/')[1]}`;
            // Upload the new image to AWS S3
            const uploadResult = await uploadFileToAWS(buffer, fileName, "image", mimeType);
            if (!uploadResult.success) {
                return res.status(500).json({
                    message: 'Failed to upload new image',
                    error: true,
                    success: false
                });
            }
            imageUrl = uploadResult.file_url;  // New image URL from S3
        }

        // Update user information (only update image if a new one was provided)
        user.email = email;
        user.name = name;
        if (imageUrl) {
            user.image = imageUrl;  // Set new image URL
        }

        await user.save();

        // Always return the latest image URL in the response
        return res.status(200).json({
            message: "User Details updated successfully",
            user,
            image: user.image,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

//ReSend the OTP

async function regenerateOtp(req, res) {
    try {
        // console.log(req.body)
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false,
                error: true,
            });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true,
            });
        }

        // console.log("user", user)

        // Generate a new OTP
        const newOtp = Math.floor(1000 + Math.random() * 9000);
        user.otp = newOtp;
        user.otpExpiresIn = Date.now() + 300000; // OTP expires in 5 minutes

        // Save the updated user data
        await user.save();

        // Send the new OTP via email
        await sendEmail(email, newOtp);

        return res.status(200).json({
            message: "OTP regenerated and sent to your email",
            success: true,
            error: false,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Internal server error",
            success: false,
            error: true,
        });
    }
}




//SIGN IN WITH GOOGLE




async function loginwithgoogle(req, res) {
    const { googleId, userName, email, isVerified, image } = req.body;
    console.log(req.body);

    if (!googleId || !userName || !email || !isVerified || !image) {
        return res
            .status(400)
            .send({ message: "Invalid Credentials", success: false });
    }
    try {
        let token = "";
        let user = await userModel.findOne({ email, isVerified: true });
        console.log("user", user);

        if (!user) {
            console.log("test")
            user = new userModel({
                googleId,
                name: userName,
                email,
                image,
                isVerified
            });
            const createdUser = await user.save();
            // console.log("createdUser", createdUser);

            token = await createToken(createdUser);
            // console.log(token);

        }
        else {
            // console.log("first user", user);
            token = await createToken(user);
        }
        res
            .status(201)
            .send({
                message: "Login successfully",
                success: true,
                data: user,
                token: token,
                error: false
            });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message, success: false });
    }
}


module.exports = {
    userSignUpController,
    userSignInController,
    verifyOtpController,
    forgetPassword,
    resetPassword,
    updatePassword,
    getAllUsers,
    findOneUser,
    updateUser,
    loginwithgoogle,
    regenerateOtp
}