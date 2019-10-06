import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const User = mongoose.model('User', UserSchema);

export class CvController{

    public saveDataCV(req: Request, res: Response){
        var id_user = req.body.id_user;
        var proyectos = JSON.parse(req.body.proyectos);
        var skills    = JSON.parse(req.body.skills);
        var idiomas   = JSON.parse(req.body.idiomas);
        if(id_user == null || Object.keys(proyectos).length == 0 || Object.keys(skills).length == 0 || Object.keys(idiomas).length == 0){
            res.json(
                {"status" : false,
                 "data"   : 'Empty data'}
            );
            return;
        }
        var experiencias = JSON.parse(req.body.experiencias);
        var estudios     = JSON.parse(req.body.estudios);
        var links_ref    = req.body.links_ref;
        var departamento = req.body.departamento;
        var distrito     = req.body.distrito;
        var tcontrato    = req.body.tcontrato;

        var updateData = {
            proyectos    : proyectos,
            experiencias : experiencias,
            skills       : skills,
            idiomas      : idiomas,
            estudios     : estudios,
            links_ref    : links_ref,
            departamento : departamento,
            distrito     : distrito,
            tcontrato    : tcontrato
        };

        User.findByIdAndUpdate(id_user, updateData, function(err, userFound) {
            if(!userFound){
                res.json(
                    {"status" : false,
                    "data"   : "User not found"}
                );
                return;
            }

            res.json(
                {"status" : true,
                 "data" : "Updated Correctly"}
                );
            return;
        });
    }

    public validateLink(req: Request, res: Response){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        var id_user = req.body.id_user;
        var link = req.body.link;
        User.countDocuments({link: req.body.link}, function(err, c) {
            if(c != 0){
                res.json(
                    {"status" : false,
                    "data"   : "Already taken"}
                );
                return;
            }

            var updateData = {
                link : link
            };
    
            User.findByIdAndUpdate(id_user, updateData, function(err, userFound) {
                if(!userFound){
                    res.json(
                        {"status" : false,
                        "data"   : "User not found"}
                    );
                    return;
                }
    
                res.json(
                    {"status" : true,
                     "data" : "Updated Correctly"}
                    );
                return;
            });
       });
    }

    public getCVData(req: Request, res: Response){
        User.findOne({ link : req.params.person}, { '_id': 0 }, function(err, user) {
            if(!user){
              res.json(
                {"status" : false,
                 "data"   : 'User not found'}
              );
              return;
            }

            res.render('cv/cv', { 
                title: user.apellidos + " " + user.nombres
            });
        });
    }

}