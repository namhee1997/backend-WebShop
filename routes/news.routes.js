const middlewareController = require('../middleware/middlewareController');
const newsController = require('../controllers/NewsControllers');

const routes = require('express').Router();

//news
routes.get('/get-all', middlewareController.verifyToken, newsController.getAllNewsCustom);
routes.get('/get-by-id/:slug', middlewareController.verifyToken, newsController.getById);
routes.post('/update-news', newsController.updateNewsCustom);
routes.post('/add-news', newsController.addNewsCustom);
routes.delete("/delete/:id", middlewareController.verifyTokenAndAdminAuth, newsController.deleteNewsCustom);

module.exports = routes;