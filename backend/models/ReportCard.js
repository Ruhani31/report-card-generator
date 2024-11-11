const mongoose = require('mongoose');

const reportCardSchema = new mongoose.Schema({
    studentName: String,
    grades: {
        English: Number,
        Hindi: Number,
        Mathematics: Number,
        Science: Number,
        SocialStudies: Number,
        ComputerScience: Number,
        PhysicalEducation: Number,
        Art: Number
    },
    qualities: [String],
    description: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReportCard', reportCardSchema);