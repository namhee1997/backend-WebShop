const middlewareController = require('../middleware/middlewareController');
const orderUserController = require('../controllers/OrderUserControllers');

const routes = require('express').Router();

//orderUser
routes.get('/get-all', middlewareController.verifyToken, orderUserController.getAllOrderUser);
routes.get('/get-by-id/:slug', middlewareController.verifyToken, orderUserController.getById);
routes.post('/update-orderUser', orderUserController.updateOrderUser);
routes.post('/add-orderUser', orderUserController.addOrderUser);
routes.delete("/delete/:id", middlewareController.verifyTokenAndAdminAuth, orderUserController.deleteOrderUser);

module.exports = routes;