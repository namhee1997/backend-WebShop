const middlewareController = require('../middleware/middlewareController');
const commentController = require('../controllers/CommentControllers');

const routes = require('express').Router();

//comment
routes.get('/get-all', middlewareController.verifyToken, commentController.getAllComment);
routes.get('/get-by-id/:id', middlewareController.verifyToken, commentController.getById);
routes.post('/update-comment', commentController.updateComment);
routes.post('/add-comment', commentController.addComment);
routes.delete("/delete/:id", middlewareController.verifyTokenAndAdminAuth, commentController.deleteComment);

module.exports = routes;