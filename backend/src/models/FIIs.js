const mongoose = require('mongoose')

const FIIsSchema = new mongoose.Schema({
    name: String,
    ticker: String,
    baseDate: Date,
    paymentDate: Date,
    priceBaseDate: Number,
    dividend: Number
});

module.exports = mongoose.model('FIIsSchema', FIIsSchema);
