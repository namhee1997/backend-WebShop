const middlewareController = require('../middleware/middlewareController');
const companyController = require('../controllers/CompanyController');

const routes = require('express').Router();

//Company
routes.get('/get-all', middlewareController.verifyToken, companyController.getAllCompany);
routes.get('/get-by-id/:slug', middlewareController.verifyToken, companyController.getById);
routes.post('/update-company', companyController.updateComapny);
routes.post('/add-company', companyController.addCompany);
routes.delete("/delete/:id", middlewareController.verifyTokenAndAdminAuth, companyController.deleteCompany);

module.exports = routes;