const mongoose = require("mongoose");

const promptSchema = new mongoose.Schema({
    promptText: {},
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Prompt = mongoose.model("CoverLetterPrompt", promptSchema);

module.exports = Prompt;
