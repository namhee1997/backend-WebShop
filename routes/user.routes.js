const authController = require('../controllers/AuthController');
const middlewareController = require('../middleware/middlewareController');
const userController = require('../controllers/UserController');

const routes = require('express').Router();

//USERS
routes.get('/get-all', middlewareController.verifyToken, userController.getAllUser);
routes.get('/get-by-id/:id', middlewareController.verifyToken, userController.getById);
routes.post('/update-user', userController.updateUser);
routes.post('/add-user', userController.addUser);
routes.delete("/delete/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = routes;