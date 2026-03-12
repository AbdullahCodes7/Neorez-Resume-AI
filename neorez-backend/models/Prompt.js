const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
    promptText: {},
});

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;
