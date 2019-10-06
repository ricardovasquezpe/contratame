import {Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/userController";
import { CvController } from "../controllers/cvController";
import { check } from "express-validator";
import { CustomValidators } from "../util/customValidators";

export class GenerateCvRoutes { 
    public userController: UserController = new UserController();
    public cvController: CvController = new CvController();
    public customValidators: CustomValidators = new CustomValidators();
    
    public routes(app): void {

        app.route('/cv/generar')
        .get((req: Request, res: Response) => {            
            res.render('generate/index', { title: 'Express' });
        });

        app.route('/cv/generar/infobasica').post([
            check('nombres').isLength({ min: 1, max : 30 }).withMessage('Nombres field is not correct'),
            check('apellidos').isLength({ min: 1, max : 30 }).withMessage('Apellidos field is not correct'),
            check('correo').isLength({ min: 1 }).isEmail().withMessage('Correo field is not correct'),
            check('telefono').isLength({ min: 1 }).withMessage('Telefono field is not correct'),
            check('fnacimiento').isLength({ min: 1 }).withMessage('Fecha de Nacimiento field is not correct')
        ], this.userController.register);

        app.route('/cv/generar/generarcv').post(this.cvController.saveDataCV);

        app.route('/cv/generar/validarLinkCv').post([
            check('link').isLength({ min: 1, max : 30 }).withMessage('Link field is not correct')
        ], this.cvController.validateLink);

    }
}