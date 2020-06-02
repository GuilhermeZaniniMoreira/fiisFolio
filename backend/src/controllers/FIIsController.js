const axios = require('axios')
const FIIs = require('../models/FIIs');

module.exports = {
    async index(request, response) {
        const fiis = await FIIs.find();
        return response.json(fiis);
    },
    async store(request, response) {

        const { name, fund, ticker } = request.body;
        fiis = await FIIs.create({
            name: name,
            fund: fund,
            ticker: ticker
        });

        response.json(fiis);
    },
    async update(request, response) {
        
        console.log(request);
        const { baseDate, payment, priceBaseDate, lastDividend } = request.body;
        const { ticker } = request.body;
        const filter = { ticker: ticker };
        const update = { baseDate: baseDate, payment: payment, priceBaseDate:priceBaseDate, lastDividend: lastDividend }

        await FIIs.findOneAndUpdate(filter, update);
    }
}