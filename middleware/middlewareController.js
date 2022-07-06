const jwt = require('jsonwebtoken');
require('dotenv').config();


const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    console.log('token is not valid');
                    return res.status(403).json('token is not valid');
                }
                req.user = user;
                next();
            })
        } else {
            console.log('token fail');

            return res.status(401).json("you're not authenticated");
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.userId == req.params.userId || req.user.role == 'admin') {
                next();
            } else {
                console.log('auth not delete');
                return res.status(403).json("you're not allowed to delete other");
            }
        })
    }
}

module.exports = middlewareController;