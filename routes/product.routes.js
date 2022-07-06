const middlewareController = require('../middleware/middlewareController');
const productController = require('../controllers/ProductController');

const routes = require('express').Router();

//USERS
routes.get('/get-all', middlewareController.verifyToken, productController.getAllProduct);
routes.get('/get-by-id/:slug', middlewareController.verifyToken, productController.getById);
routes.get('/getproductrelater/:slug', middlewareController.verifyToken, productController.getProductRelater);
routes.post('/update-product', productController.updateProduct);
routes.post('/add-product', productController.addProduct);
routes.delete("/delete/:id", middlewareController.verifyTokenAndAdminAuth, productController.deleteProduct);

module.exports = routes;