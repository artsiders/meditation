const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    profil: { type: String, required: true },
    phone: { type: String, required: true },
});
module.exports = mongoose.model('User', userSchema);