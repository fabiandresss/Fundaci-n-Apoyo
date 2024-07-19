const mongoose = require('mongoose');

const mandateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    rut: { type: String, required: true },
    phone: { type: String, required: true },
    day: { type: Number, required: true },
    amount: { type: Number, required: true },
    cardDetails: { type: String, required: true },
    cvv: { type: Number, required: true, min: 100, max: 9999 },
    expiryDate: { type: Date, required: true }
});

module.exports = mongoose.model('Mandate', mandateSchema);
