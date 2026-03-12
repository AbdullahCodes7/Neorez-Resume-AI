const mongoose = require("mongoose")

const jobApplicationSchema = new mongoose.Schema({
    applicationDate: { type: String, required: true },
    applyMethod: { type: String, required: true },
    companyName: { type: String, required: true },
    description: { type: String, required: true },
    jobTitle: { type: String, required: true },
    jobUrl: { type: String, required: true },
    location: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.model("JobApplication", jobApplicationSchema)