"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userModel_1 = require("../models/userModel");
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const User = mongoose.model('User', userModel_1.UserSchema);
class UserController {
    login(req, res) {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        User.findOne({ username: req.body.username, 'password': req.body.password }, { '_id': 1, 'username': 1, 'password': 1 }, function (err, user) {
            if (!user) {
                res.json({ "status": false,
                    "data": 'User not found' });
                return;
            }
            var token = jsonwebtoken_1.sign(user.toJSON(), "123456789" /*, { expiresIn : '24h' }*/);
            res.json({ "status": true,
                "data": user,
                "token": token });
            return;
        });
    }
    register(req, res) {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        req.body.created_at = new Date();
        req.body.fnacimiento = new Date(req.body.fnacimiento);
        var newUser = User(req.body);
        newUser.save(function (err, user) {
            if (err) {
                if (err.code == 11000) {
                    res.json({ "status": false,
                        "data": "user already created" });
                }
                else {
                    res.json({ "status": false,
                        "data": "Weird error" });
                }
                return;
            }
            res.json({ "status": true,
                "data": user.id });
            return;
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map