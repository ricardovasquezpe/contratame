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

        app.route('/cv/generate')
        .get((req: Request, res: Response) => {            
            res.render('generate/index', { title: 'Express' });
        });

        app.route('/cv/generate/infobasica').post([
            check('nombres').isLength({ min: 1, max : 20 }).withMessage('Nombres field is not correct'),
            check('apellidos').isLength({ min: 1, max : 20 }).withMessage('Apellidos field is not correct'),
            check('correo').isLength({ min: 1 }).isEmail().withMessage('Correo field is not correct'),
            check('telefono').isLength({ min: 1 }).withMessage('Telefono field is not correct'),
            check('departamento').isLength({ min: 1 }).withMessage('Departamento field is not correct'),
            check('distrito').isLength({ min: 1 }).withMessage('Distrito field is not correct')
        ], this.userController.register);

        app.route('/cv/generate/generatecv').post(this.cvController.saveDataCV);

    }
}