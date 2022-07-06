const controller = require('../controllers/Cloudianary.controller');
const fileUploader = require('../configs/cloudinary.config');

const routes = require('express').Router();
//Cloudianary
// routes.get('/get-file', controller.getAll);
routes.post('/upload-file', fileUploader.single('file'), controller.create);

module.exports = routes;