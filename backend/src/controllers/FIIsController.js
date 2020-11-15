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

        const { ticker, baseDate, paymentDate, priceBaseDate, dividend } = request.body;
        
        const fii = await FIIs.findOne({ ticker: ticker });

        if (fii && fii.historic) {
            const historic = fii.historic;
            const found = historic.some(el => new Date(el.baseDate).getTime() === new Date(historic[0].baseDate).getTime());
            
            if (!found) {
                const filter = { ticker };
                const update = { baseDate, paymentDate, priceBaseDate, dividend, historic: [...historic, { baseDate, paymentDate, priceBaseDate, dividend }] };
                await FIIs.findOneAndUpdate(filter, update);
            }
        }

        const fii = await FIIs.findOne({ ticker: ticker });
        response.json(fii);
    }
}