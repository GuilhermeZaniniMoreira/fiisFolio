const axios = require('axios')
const FIIs = require('../models/FIIs');

module.exports = {
    async index(request, response) {
        const fiis = await FIIs.find();
        return response.json(fiis);
    },
    async store(request, response) {

        const { name, ticker } = request.body;
        fiis = await FIIs.create({
            name: name,
            ticker: ticker
        });

        response.json(fiis);
    },
    async update(request, response) {

        
        const { baseDate, paymentDate, priceBaseDate, dividend } = request.body;
        
        const { ticker } = request.body;
        const filter = { ticker: ticker };
        const update = {baseDate: baseDate, paymentDate: paymentDate,
                        priceBaseDate: priceBaseDate, dividend: dividend}

        await FIIs.findOneAndUpdate(filter, update);

        const fii = await FIIs.find({ticker: ticker});
        response.json(fii);
    }
}