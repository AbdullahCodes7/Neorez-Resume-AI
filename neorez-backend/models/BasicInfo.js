const mongoose = require('mongoose');

// Define the education schema
const educationSchema = new mongoose.Schema({
    institution: { type: String },
    degree: { type: String },
    reference: { type: String },
    startDate: { type: String },
    endDate: { type: String }
});

// Define the skills schema
const skillSchema = new mongoose.Schema({
    name: { type: String },
    level: { type: String } // You can define validation for level, like allowed values (e.g., 'Beginner', 'Intermediate', 'Advanced')
});

// Define the main user schema
const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Ensure each userId is unique
    },
    name: { type: String, required: true },
    // lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    skills: [skillSchema], // Array of skill sub-documents
    desiredLocation: { type: String },
    desiredJobTitle: { type: String },
    education: [educationSchema] // Array of education sub-documents
});

// Create and export the UserBasicInfo model
const UserBasicInfo = mongoose.model('UserBasicInfo', userSchema);

module.exports = UserBasicInfo;
