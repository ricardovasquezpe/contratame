import {Request, Response, NextFunction} from "express";

export class GenerateCvRoutes { 
    
    public routes(app): void {

        app.route('/cv/generate')
        .get((req: Request, res: Response) => {            
            res.render('generate/index', { title: 'Express' });
        });

    }
}