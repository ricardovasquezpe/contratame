import {Request, Response, NextFunction} from "express";

export class CvRoutes { 
    
    public routes(app): void {

        app.route('/micv/:person')
        .get((req: Request, res: Response) => {            
            res.render('cv/cv', { title: 'Express' });
        });

    }
}