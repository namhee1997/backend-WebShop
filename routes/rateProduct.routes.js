const middlewareController = require('../middleware/middlewareController');
const ratesController = require('../controllers/RatesControllers');

const routes = require('express').Router();

//rates
routes.get('/get-all', middlewareController.verifyToken, ratesController.getAllRates);
routes.get('/get-by-id/:id', middlewareController.verifyToken, ratesController.getById);
routes.post('/update-rates', ratesController.updateRates);
routes.post('/add-rates', ratesController.addRates);
routes.delete("/delete/:id", middlewareController.verifyTokenAndAdminAuth, ratesController.deleteRates);

module.exports = routes;