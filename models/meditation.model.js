const mongoose = require('mongoose');

const meditationSchema = mongoose.Schema({
    ref: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
});
module.exports = mongoose.model('Meditation', meditationSchema);