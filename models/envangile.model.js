const mongoose = require('mongoose');

const evangileSchema = mongoose.Schema({
    "catholic period": { type: String, required: false },
    reference: { type: String, required: false },
    Date: { type: String, required: false },
    Homily: { type: String, required: false },
    observation: { type: String, required: false },
    evangile: { type: String, required: false },
    image: { type: String, required: false },
});
module.exports = mongoose.model('Evangile', evangileSchema);