const middlewareController = require('../middleware/middlewareController');
const slidesController = require('../controllers/SlidesCustomController');

const routes = require('express').Router();

//slides
routes.get('/get-all', middlewareController.verifyToken, slidesController.getAllSlidesCustom);
routes.get('/get-by-id/:slug', middlewareController.verifyToken, slidesController.getById);
routes.post('/update-slides', slidesController.updateSlidesCustom);
routes.post('/add-slides', slidesController.addSlidesCustom);
routes.delete("/delete/:id", middlewareController.verifyTokenAndAdminAuth, slidesController.deleteSlidesCustom);

module.exports = routes;