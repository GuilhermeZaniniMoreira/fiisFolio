const axios = require('axios')
const FIIs = require('../models/FIIs');
const mongoose = require('mongoose');
var fs = require('fs');
const { base } = require('../models/FIIs');

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
        const { ticker, historic } = request.body;
        const filter = { ticker };
        const fii = await FIIs.findOneAndUpdate(filter, request.body);
        response.json(fii);
    }
}