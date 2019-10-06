import {Request, Response, NextFunction} from "express";
import { CvController } from "../controllers/cvController";

export class CvRoutes { 

    public cvController: CvController = new CvController();
    
    public routes(app): void {

        app.route('/micv/:person').get(this.cvController.getCVData);

    }
}