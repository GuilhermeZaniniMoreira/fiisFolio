const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser')

mongoose.connect(`mongodb+srv://guilherme:${process.env.PASSWORD}@cluster0-6ylbg.mongodb.net/fiis?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(routes);

app.listen(3333);