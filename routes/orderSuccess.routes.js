const middlewareController = require('../middleware/middlewareController');
const orderSuccessController = require('../controllers/OrderSuccessControllers');

const routes = require('express').Router();

//orderSuccess
routes.get('/get-all', middlewareController.verifyToken, orderSuccessController.getAllOrderSuccess);
routes.get('/get-by-id/:slug', middlewareController.verifyToken, orderSuccessController.getById);
routes.post('/update-orderSuccess', orderSuccessController.updateOrderSuccess);
routes.post('/add-orderSuccess', orderSuccessController.addOrderSuccess);
routes.delete("/delete/:id", middlewareController.verifyTokenAndAdminAuth, orderSuccessController.deleteOrderSuccess);

module.exports = routes;