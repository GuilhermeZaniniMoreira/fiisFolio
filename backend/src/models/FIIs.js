const mongoose = require('mongoose')

const FIIsSchema = new mongoose.Schema({
    name: String,
    fund: String,
    ticker: String,
    baseDate: Date,
    priceBaseDate: Number,
    lastDivident: Date,
    list: []
});

module.exports = mongoose.model('FIIsSchema', FIIsSchema);
