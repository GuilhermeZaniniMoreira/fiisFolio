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

        const { baseDate, priceBaseDate, lastDividend, list } = request.data;
        const { ticker } = request.data;
        const filter = { ticker: ticker };
        const update = { baseDate: baseDate, priceBaseDate:priceBaseDate, 
                         lastDividend: lastDividend, list: list }

        await FIIs.findOneAndUpdate(filter, update);
    }
}