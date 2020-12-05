const { Router } = require('express');
const FIIsController = require('./controllers/FIIsController');
const routes = Router();

routes.get('/fiis', FIIsController.index);
routes.post('/fiis', FIIsController.store);
routes.post('/update', FIIsController.update);
routes.post('/updateHistoric', FIIsController.updateHistoric);

module.exports = routes;
