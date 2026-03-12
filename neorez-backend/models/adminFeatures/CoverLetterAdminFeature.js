const mongoose = require('mongoose');

const coverLetterSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    body: { type: String, required: true },
    features: [{ type: String }],
    image: { type: String },
}, { timestamps: true });

const CoverLetterBuilder = mongoose.model('CoverLetterBuilder', coverLetterSchema);
module.exports = CoverLetterBuilder;
