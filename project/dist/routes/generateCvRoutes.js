"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const cvController_1 = require("../controllers/cvController");
const express_validator_1 = require("express-validator");
const customValidators_1 = require("../util/customValidators");
class GenerateCvRoutes {
    constructor() {
        this.userController = new userController_1.UserController();
        this.cvController = new cvController_1.CvController();
        this.customValidators = new customValidators_1.CustomValidators();
    }
    routes(app) {
        app.route('/cv/generar')
            .get((req, res) => {
            res.render('generate/index', { title: 'Express' });
        });
        app.route('/cv/generar/infobasica').post([
            express_validator_1.check('nombres').isLength({ min: 1, max: 30 }).withMessage('Nombres field is not correct'),
            express_validator_1.check('apellidos').isLength({ min: 1, max: 30 }).withMessage('Apellidos field is not correct'),
            express_validator_1.check('correo').isLength({ min: 1 }).isEmail().withMessage('Correo field is not correct'),
            express_validator_1.check('telefono').isLength({ min: 1 }).withMessage('Telefono field is not correct'),
            express_validator_1.check('fnacimiento').isLength({ min: 1 }).withMessage('Fecha de Nacimiento field is not correct')
        ], this.userController.register);
        app.route('/cv/generar/generarcv').post(this.cvController.saveDataCV);
        app.route('/cv/generar/validarLinkCv').post([
            express_validator_1.check('link').isLength({ min: 1, max: 30 }).withMessage('Link field is not correct')
        ], this.cvController.validateLink);
        //app.route('/cv/email').get(this.cvController.sendEmailBienvenida);
    }
}
exports.GenerateCvRoutes = GenerateCvRoutes;
//# sourceMappingURL=generateCvRoutes.js.map