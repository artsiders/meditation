const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema({
    userId: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
});
module.exports = mongoose.model('Subscription', subscriptionSchema);