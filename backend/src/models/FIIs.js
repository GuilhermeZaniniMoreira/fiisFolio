const mongoose = require('mongoose')

const FIIsSchema = new mongoose.Schema({
    name: String,
    fund: String,
    ticker: String,
    baseDate: Date,
    payment: Date,
    priceBaseDate: Number,
    lastDivident: Date
});

module.exports = mongoose.model('FIIsSchema', FIIsSchema);
