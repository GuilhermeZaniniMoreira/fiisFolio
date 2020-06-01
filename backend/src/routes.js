const { Router } = require('express');
const FIIsController = require('./controllers/FIIsController');
const routes = Router();

routes.get('/fiis', FIIsController.index);
routes.post('/fiis', FIIsController.store);
routes.post('/fii-update', FIIsController.update);

module.exports = routes;
