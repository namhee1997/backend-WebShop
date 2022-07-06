const middlewareController = require('../middleware/middlewareController');
const cartController = require('../controllers/CartControllers');

const routes = require('express').Router();

//cart
routes.get('/get-all', middlewareController.verifyToken, cartController.getAllCart);
routes.get('/get-by-id/:slug', middlewareController.verifyToken, cartController.getById);
routes.post('/update-cart', cartController.updateCart);
routes.post('/add-cart', cartController.addCart);
routes.delete("/delete/:id", middlewareController.verifyTokenAndAdminAuth, cartController.deleteCart);
routes.delete("/delete-all/", middlewareController.verifyTokenAndAdminAuth, cartController.deleteAllCart);

module.exports = routes;