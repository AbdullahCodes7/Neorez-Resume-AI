const mongoose = require("mongoose");
// Define schema for the design section
const designSchema = new mongoose.Schema({
    lineHeight: { type: Number, default: 1.4 },
    fontSize: { type: Number, default: 14 },
    margin: { type: Number, default: 5 },
    color: { type: String, default: "" },
    fontFamily: { type: String, default: "" }
});
// Cover Letter Schema
const coverLetterSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    }, // Unique identifier for the resume
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Set to true if you want this field to be mandatory
    },
    title: {
        type: String,
        // required: true,  
    },
    location: {
        type: String,
        // required: true,  
    },
    body: [{
        description: {
            type: String
        },
        // required: true,  
    }],
    description: {
        type: String,
    },
    letterTo: {
        type: String,
    },
    linkedIn: {
        type: String,
    },
    name: {
        type: String,
        // required: true,  
    },
    address: {
        type: String,
        // required: true,  
    },
    person: {
        type: String,
    },
    phone: {
        type: String,
        // required: true 
    },
    email: {
        type: String,
        // required: true,  
        // trim: true,  
    },
    additionalInfo: {
        type: String,
    },
    regards: {
        type: String,
        default: "Sincerely,", // Default value
    },
    links: {
        type: [String], // Array of strings for links
        default: [""],
    },
    design: designSchema,
    templateId: {
        type: Number,
    },
    // coverRef: {
    //     type: String,
    // },
    company: {
        type: String,
    },
    date: {
        type: String,
    },
    designation: {
        type: String,
    },
}, {
    timestamps: true // Automatically manage createdAt and updatedAt timestamps
});

const CoverLetterModel = mongoose.model("CoverLetter", coverLetterSchema);
module.exports = CoverLetterModel;
