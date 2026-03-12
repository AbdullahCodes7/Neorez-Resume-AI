const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    heading: { type: String, required: true },
    body: { type: String, required: true },
    features: [{ type: String }],
    image: { type: String },
}, { timestamps: true });

const ResumeBuilder = mongoose.model('ResumeBuilder', resumeSchema);
module.exports = ResumeBuilder;
