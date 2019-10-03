"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const express_validator_1 = require("express-validator");
const customValidators_1 = require("../util/customValidators");
const jsonwebtoken_1 = require("jsonwebtoken");
class IndexRoutes {
    constructor() {
        this.userController = new userController_1.UserController();
        this.customValidators = new customValidators_1.CustomValidators();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.render('landing/first', { title: 'Express' });
        });
        app.route('/login').post([
            express_validator_1.check('username').isLength({ min: 1 }).withMessage('Username field is required'),
            express_validator_1.check('password').isLength({ min: 1 }).withMessage('Password field is required')
        ], this.userController.login);
        app.route('/register').post([
            express_validator_1.check('name').isLength({ min: 1, max: 20 }).withMessage('Name field is not correct'),
            express_validator_1.check('lastname').isLength({ min: 1, max: 20 }).withMessage('Lastname field is not correct'),
            express_validator_1.check('username').isLength({ min: 1, max: 20 }).withMessage('Username field is not correct'),
            express_validator_1.check('password').isLength({ min: 6, max: 20 }).withMessage('Password field is not correct'),
            express_validator_1.check('birthdate').isLength({ min: 1 }).custom(this.customValidators.isValidDate).withMessage('Birthdate field is not correct'),
            express_validator_1.check('email').isLength({ min: 1 }).isEmail().withMessage('Email field is not correct')
        ], this.userController.register);
        var middleware = function (req, res, next) {
            var token = req.headers['x-access-token'];
            if (token) {
                jsonwebtoken_1.verify(token, app.get('superSecret'), function (err, decoded) {
                    if (err) {
                        res.json({ "status": false,
                            "data": 'Failed to authenticate token' });
                        return;
                    }
                    else {
                        req.decoded = decoded;
                        next();
                    }
                });
            }
            else {
                res.json({ "status": false,
                    "data": 'No token provided' });
                return;
            }
        };
        //app.use(middleware);
    }
}
exports.IndexRoutes = IndexRoutes;
//# sourceMappingURL=indexRoutes.js.map