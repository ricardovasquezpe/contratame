"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userModel_1 = require("../models/userModel");
const express_validator_1 = require("express-validator");
const moment = require("moment");
const constants_1 = require("../util/constants");
const emails_1 = require("../util/emails");
const User = mongoose.model('User', userModel_1.UserSchema);
class CvController {
    constructor() {
        this.emails = new emails_1.Emails();
        this.saveDataCV = (req, res) => {
            var id_user = req.body.id_user;
            var proyectos = JSON.parse(req.body.proyectos);
            var skills = JSON.parse(req.body.skills);
            var idiomas = JSON.parse(req.body.idiomas);
            if (id_user == null || Object.keys(proyectos).length == 0 || Object.keys(skills).length == 0 || Object.keys(idiomas).length == 0) {
                res.json({ "status": false,
                    "data": 'Empty data' });
                return;
            }
            var experiencias = JSON.parse(req.body.experiencias);
            var estudios = JSON.parse(req.body.estudios);
            var links_ref = [];
            if (req.body.links_ref.length > 0) {
                links_ref = req.body.links_ref.split(",");
            }
            var departamento = req.body.departamento;
            var distrito = req.body.distrito;
            var tcontrato = req.body.tcontrato;
            var updateData = {
                proyectos: proyectos,
                experiencias: experiencias,
                skills: skills,
                idiomas: idiomas,
                estudios: estudios,
                links_ref: links_ref,
                departamento: departamento,
                distrito: distrito,
                tcontrato: tcontrato
            };
            User.findByIdAndUpdate(id_user, updateData, (err, userFound) => {
                if (!userFound) {
                    res.json({ "status": false,
                        "data": "User not found" });
                    return;
                }
                this.emails.sendEmailBienvenida(userFound.correo, userFound.nombres);
                res.json({ "status": true,
                    "data": "Updated Correctly" });
                return;
            });
        };
    }
    validateLink(req, res) {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        var id_user = req.body.id_user;
        var link = req.body.link;
        User.countDocuments({ link: req.body.link }, function (err, c) {
            if (c != 0) {
                res.json({ "status": false,
                    "data": "Already taken" });
                return;
            }
            var updateData = {
                link: link
            };
            User.findByIdAndUpdate(id_user, updateData, function (err, userFound) {
                if (!userFound) {
                    res.json({ "status": false,
                        "data": "User not found" });
                    return;
                }
                res.json({ "status": true,
                    "data": "Updated Correctly" });
                return;
            });
        });
    }
    getCVData(req, res) {
        User.findOne({ link: req.params.person }, { '_id': 0 }, function (err, user) {
            if (!user) {
                res.render('cv/notfound');
                return;
            }
            var idiomas = "";
            user.idiomas.forEach(function (item, index) {
                if (user.idiomas.length == 1) {
                    idiomas = item;
                }
                else {
                    idiomas += item;
                    if (index == user.idiomas.length - 2) {
                        idiomas += " y ";
                    }
                    else if (index != user.idiomas.length - 1) {
                        idiomas += ", ";
                    }
                }
            });
            user.estudios.sort(function (a, b) {
                return new Date(b.fecha) - new Date(a.fecha);
            });
            user.experiencias.sort(function (a, b) {
                return new Date(b.fsalida) - new Date(a.fsalida);
            });
            user.proyectos.sort(function (a, b) {
                return new Date(b.fterminado) - new Date(a.fterminado);
            });
            res.render('cv/cv', {
                title: user.apellidos + ", " + user.nombres,
                iniciales: user.nombres.charAt(0) + user.apellidos.charAt(0),
                nombres: user.nombres,
                apellidos: user.apellidos,
                anos: moment().diff(user.fnacimiento, 'years'),
                telefono: user.telefono,
                correo: user.correo,
                idiomas: idiomas,
                skills: user.skills,
                links: user.links_ref,
                tcontrato: constants_1.Constants.TIPO_CONTRATOS[user.tcontrato],
                proyectos: user.proyectos,
                experiencias: user.experiencias,
                estudios: user.estudios,
                meses: constants_1.Constants.MESES,
                moment: moment
            });
        });
    }
}
exports.CvController = CvController;
//# sourceMappingURL=cvController.js.map