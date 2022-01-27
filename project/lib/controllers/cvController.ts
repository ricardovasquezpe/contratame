import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as moment from 'moment'; 
import { Constants } from '../util/constants';
import { Emails } from '../util/emails';

const User = mongoose.model('User', UserSchema);


export class CvController{
    public emails: Emails = new Emails();

    public saveDataCV = (req: Request, res: Response) => {
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
        var links_ref    = [];
        if(req.body.links_ref.length > 0){
            links_ref    = req.body.links_ref.split(",");
        }
        var departamento = req.body.departamento;
        var distrito     = req.body.distrito;
        var tcontrato    = req.body.tcontrato;
        var titulo       = req.body.titulo;

        var updateData = {
            proyectos    : proyectos,
            experiencias : experiencias,
            skills       : skills,
            idiomas      : idiomas,
            estudios     : estudios,
            links_ref    : links_ref,
            departamento : departamento,
            distrito     : distrito,
            tcontrato    : tcontrato,
            titulo       : titulo
        };

        User.findByIdAndUpdate(id_user, updateData, (err, userFound) => {
            if(!userFound){
                res.json(
                    {"status" : false,
                    "data"   : "User not found"}
                );
                return;
            }

            this.emails.sendEmailBienvenida(userFound.correo, userFound.nombres)

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
                res.render('cv/notfound');
                return;
            }
            
            var idiomas = "";
            user.idiomas.forEach(function (item, index) {
                if(user.idiomas.length == 1){
                    idiomas = item;
                }else{
                    idiomas += item;
                    if(index == user.idiomas.length - 2){
                        idiomas += " y ";
                    } else if(index != user.idiomas.length - 1){
                        idiomas += ", ";
                    }
                }
            });

            user.estudios.sort(function(a,b){
                return <any>new Date(b.fecha) - <any>new Date(a.fecha);
            });

            user.experiencias.sort(function(a,b){
                return <any>new Date(b.fsalida) - <any>new Date(a.fsalida);
            });

            user.proyectos.sort(function(a,b){
                return <any>new Date(b.fterminado) - <any>new Date(a.fterminado);
            });

            res.render('cv/cv', { 
                title        : user.apellidos + ", " + user.nombres,
                iniciales    : user.nombres.charAt(0)+user.apellidos.charAt(0),
                nombres      : user.nombres,
                apellidos    : user.apellidos,
                anos         : moment().diff(user.fnacimiento, 'years'),
                telefono     : user.telefono,
                correo       : user.correo,
                idiomas      : idiomas,
                skills       : user.skills,
                links        : user.links_ref,
                tcontrato    : Constants.TIPO_CONTRATOS[user.tcontrato],
                proyectos    : user.proyectos,
                experiencias : user.experiencias,
                estudios     : user.estudios,
                meses        : Constants.MESES,
                moment       : moment
            });
        });
    }

}