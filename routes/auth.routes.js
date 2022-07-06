const authController = require('../controllers/AuthController');
const middlewareController = require('../middleware/middlewareController');

const routes = require('express').Router();
//register
routes.post('/register', authController.registerUser);

//login
routes.post('/login', authController.loginUser);


//refresh
routes.post("/refresh", authController.requestRefreshToken);

//logout
routes.post("/logout", authController.logoutUser);

module.exports = routes;