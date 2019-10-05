import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

//const User = mongoose.model('User', UserSchema);

export class CvController{

    public saveDataCV(req: Request, res: Response){
        var id_user = req.body.id_user;
        var proyectos = JSON.parse(req.body.proyectos);
        var skills    = JSON.parse(req.body.experiencias);
        var idiomas   = JSON.parse(req.body.experiencias);
        if(id_user == null || Object.keys(proyectos).length == 0 || Object.keys(skills).length == 0 || Object.keys(idiomas).length == 0){
            res.json(
                {"status" : false,
                 "data"   : 'Empty data'}
            );
            return;
        }

        
    }
}