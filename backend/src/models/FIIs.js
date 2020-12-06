const mongoose = require('mongoose')

const FIIsSchema = new mongoose.Schema({
    name: String,
    ticker: String,
    baseDate: Date,
    paymentDate: Date,
    priceBaseDate: Number,
    dy: Number,
    dividend: Number,
    historic: Array,
}, { timestamps: true });

module.exports = mongoose.model('FIIsSchema', FIIsSchema);
