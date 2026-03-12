const mongoose = require("mongoose");


const subscriptionSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});



const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
    otp: {
        type: Number
    },
    otpExpiresIn: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },
    googleId: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
    },
    avail_free_trial: {
        type: Boolean,
        default: true,
    },
    subscriptionStatus: {
        type: String,
        enum: ['inactive', 'Weekly Plan', 'Monthly Plan', 'Annual Plan'],
        default: 'Monthly Plan'
    },
    subscription: [subscriptionSchema]
}, { timestamps: true })
const User = mongoose.model("User", userSchema);
module.exports = User