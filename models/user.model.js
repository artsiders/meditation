const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: { type: String, required: false },
    profil: { type: String, required: false },
    phone: { type: String, required: true },
});
module.exports = mongoose.model('User', userSchema);