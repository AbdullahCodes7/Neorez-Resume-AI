const mongoose = require("mongoose");

// Define schema for the profile section
const profileSectionSchema = new mongoose.Schema({
    header: { type: String, default: "profile" },
    type: { type: String, default: "profile" },
    profileImage: { type: String, default: "" },
    name: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    jobTitle: { type: String, default: "" },
    links: [{ type: String }]
});

// Define schema for the about section
const aboutSectionSchema = new mongoose.Schema({
    header: { type: String, default: "about" },
    type: { type: String, default: "about" },
    items: [
        {
            description: { type: String, default: "" }
        }
    ]
});

// Define schema for the education section
const educationSectionSchema = new mongoose.Schema({
    header: { type: String, default: "Education" },
    type: { type: String, default: "education" },
    items: [
        {
            degree: { type: String, default: "" },
            institution: { type: String, default: "" },
            reference: { type: String, default: "" },
            year: { type: String, default: "" }
        }
    ]
});

// Define schema for the work experience section
const workExperienceSectionSchema = new mongoose.Schema({
    header: { type: String, default: "Work Experience" },
    type: { type: String, default: "workExperience" },
    items: [
        {
            jobTitle: { type: String, default: "" },
            company: { type: String, default: "" },
            duration: { type: String, default: "" },
            description: { type: String, default: "" }
        }
    ]
});

// Define schema for the skills section
const skillsSectionSchema = new mongoose.Schema({
    header: { type: String, default: "skills" },
    type: { type: String, default: "skills" },
    items: [
        {
            name: { type: String, default: "" },
            level: { type: String, default: "Advanced" }
        }
    ]
});

// Define schema for the languages section
const languageSectionSchema = new mongoose.Schema({
    header: { type: String, default: "languages" },
    type: { type: String, default: "languages" },
    items: [
        {
            name: { type: String, default: "" },
            proficiency: { type: String, default: "" }
        }
    ]
});

// Define schema for the references section
const referencesSectionSchema = new mongoose.Schema({
    header: { type: String, default: "references" },
    type: { type: String, default: "references" },
    items: [
        {
            name: { type: String, default: "" },
            detail: { type: String, default: "" },
            contactInfo: { type: String, default: "" },
            email: { type: String, default: "" }
        }
    ]
});

// Define schema for the certifications section
const certificationSectionSchema = new mongoose.Schema({
    header: { type: String, default: "certifications" },
    type: { type: String, default: "certificates" },
    items: [
        {
            title: { type: String, default: "" },
            date: { type: String, default: "" },
            description: { type: String, default: "" }
        }
    ]
});

// Define schema for the hobbies section
const hobbiesSectionSchema = new mongoose.Schema({
    header: { type: String, default: "Interest" },
    type: { type: String, default: "hobbies" },
    items: [
        {
            name: { type: String, default: "Gaming" }
        }
    ]
});

// Define schema for custom sections
const customSectionSchema = new mongoose.Schema({
    header: { type: String, default: "Custom Section" },
    type: { type: String, default: "customSections" },
    items: [{ type: Object }]
});

// Define schema for the design section
const designSchema = new mongoose.Schema({
    lineHeight: { type: Number, default: 1.4 },
    fontSize: { type: Number, default: 14 },
    margin: { type: Number, default: 5 },
    color: { type: String, default: "" },
    fontFamily: { type: String, default: "" }
});

// Main Resume Schema
const resumeSchema = new mongoose.Schema({
    uid: {
        type: String
    }, // Unique identifier for the resume

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    templateId: {
        type: Number
    },
    sections: {
        type: Array,
        default: []
    },
    resumeName: {
        type: String,

    },
    design: designSchema, // Design information for the resume
}, { timestamps: true });

const ResumeModel = mongoose.model("Resume", resumeSchema);
module.exports = ResumeModel;
