const express = require('express');
const UserBasicInfo = require('../models/BasicInfo');
const User = require('../models/User');
const PdfParse = require('pdf-parse');
const pdfResumeGeneration = require("./functionalities/OpenAiPdf");
const { default: mongoose } = require('mongoose');

// Add or update user info
// const addUserInfo = async (req, res) => {
//     try {
//         // Extract the payload from req.body
//         const { payload } = req.body;

//         if (!payload) {
//             return res.status(400).json({ message: "Payload is missing" });
//         }

//         console.log(req.body)

//         const { userId, name, email, contactNumber, country, address, skills, desiredLocation, desiredJobTitle, education } = payload;

//         // Check if the required fields are provided
//         if (!name || !email || !contactNumber || !country || !address) {
//             return res.status(400).json({ message: "Required fields are missing" });
//         }

//         // Check if user already exists by userId
//         let user = await UserBasicInfo.findOne({ userId });


//         console.log("user==============", user)
//         if (user) {
//             // Update the existing user data
//             user = await UserBasicInfo.findOneAndUpdate(
//                 { userId },
//                 payload,
//                 { new: true }
//             );
//             return res.json({ message: 'User updated successfully', user, success: true });
//         }

//         // If user does not exist, create a new one
//         const newUser = new UserBasicInfo(payload);
//         console.log("newUser", newUser)
//         await newUser.save();

//         res.json({ message: 'Information Updated successfully', newUser, success: true });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

const addUserInfo = async (req, res) => {
    try {
        const { payload } = req.body;

        if (!payload) {
            return res.status(400).json({ message: "Payload is missing" });
        }

        const { userId, name, email, contactNumber, country, address } = payload;

        // Validate required fields
        if (!name || !email || !contactNumber || !country || !address) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        // Look for an existing user based on the userId
        let user = await UserBasicInfo.findOne({ userId });
        
        if (user) {
            // If the user exists, update the user data based on userId
            user = await UserBasicInfo.findOneAndUpdate(
                { userId },  
                { $set: payload },  
                { new: true, runValidators: true }  
            );

            return res.json({ message: 'User updated successfully', user, success: true });
        } else {
            // Create a new payload without _id to let MongoDB generate one
            const newPayload = { ...payload };
            if (newPayload._id) delete newPayload._id;
            
            // Check if email already exists
            const emailExists = await UserBasicInfo.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Email Already Exists", success: false });
            }

            // Create a new user
            const newUser = new UserBasicInfo(newPayload);
            await newUser.save();
            
            return res.json({ message: 'User Updated successfully', user: newUser, success: true });
        }
    } catch (err) {
        console.error(err);

        // Handle duplicate key errors more specifically
        if (err.code === 11000) {
            const keyValue = err.keyValue;
            if (keyValue.email) {
                return res.status(400).json({ message: "Email already exists", success: false });
            } else if (keyValue._id) {
                return res.status(400).json({ message: "Duplicate ID error", success: false });
            } else {
                return res.status(400).json({ message: "Duplicate key error", field: Object.keys(keyValue)[0], success: false });
            }
        }

        res.status(500).json({ message: 'Server error', success: false });
    }
};

// const addUserInfo = async (req, res) => {
//     try {

//         const { payload } = req.body;
//         if (!payload) {
//             return res.status(400).json({ message: "Payload is missing" });
//         }

//         const { userId, name, email, contactNumber, country, address, skills, desiredLocation, desiredJobTitle, education } = payload;

//         // Validate required fields
//         if (!name || !email || !contactNumber || !country || !address) {
//             return res.status(400).json({ message: "Required fields are missing" });
//         }

//         // // Check if a user with this email already exists
//         // // This helps to enforce that no two users (with different userId) share the same email.
//         // const userWithEmail = await UserBasicInfo.findOne({ email });
//         // if (userWithEmail && userWithEmail.userId !== userId) {
//         //     return res.status(400).json({ message: "Email is already in use by another user" });
//         // }

//         // Look for an existing user based on the userId
//         let user = await UserBasicInfo.findOne({ userId });
//         if (user) {
//             // Update the existing user data if the record is found.
//             user = await UserBasicInfo.findOneAndUpdate({ userId }, payload, { new: true });
//             return res.json({ message: 'User updated successfully', user, success: true });
//         } else {
//             // If no record is found for this userId, create a new user.
//             const newUser = new UserBasicInfo(payload);
//             await newUser.save();
//             return res.json({ message: 'User created successfully', newUser, success: true });
//         }
//     } catch (err) {
//         console.error(err);

//         if (err.code === 11000) {
//             return res.status(400).json({ message: "Duplicate key error" });
//         }
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// Get user info by userId
const getUserInfo = async (req, res) => {
    try {
        const { userId } = req.params; // Expecting userId in the route parameter

        // Find the user by userId
        const user = await UserBasicInfo.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        // console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        
        console.log(user, userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const uploadCV = async (req, res) => {
    const { cv } = req.files;
    try {
        // cv.mv(path.join(assetsFolder, cv.name));
        const mimeType = cv.mimetype;
        // console.log("mimeType =====", mimeType)
        // res.status(200).json({ "message": "ok" })
        // const pdfPath = './SherazCV.pdf';
        // console.log(pdfPath);
        const generatedPdfResume = await pdfResumeGeneration.pdfGenerateChat(cv.data, mimeType);
        // console.log(generatedPdfResume);
        const stringResume = generatedPdfResume?.split("undefined")[0];
        // console.log(generatedPdfResume);
        // console.log("ss");
        // console.log(stringResume);
        res.json(JSON.parse(stringResume));
    }
    catch (e) {
        console.log(e.message);
        res.json({ "message": e.message });
    }
};


module.exports = {
    addUserInfo,
    getUserInfo,
    uploadCV,
    getCurrentUser,
};
