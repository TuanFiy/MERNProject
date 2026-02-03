const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    techStack: {
        type: String,
        required: false
    },
    githubLink: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

// Pastikan ejaan ini betul sebiji-sebiji
module.exports = mongoose.model('Project', ProjectSchema);