const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    filename: {
        type: String,

    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Video', VideoSchema);
