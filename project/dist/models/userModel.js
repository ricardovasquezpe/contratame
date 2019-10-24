"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.UserSchema = new Schema({
    nombres: String,
    apellidos: String,
    usuario: String,
    password: String,
    correo: { type: String, required: true, unique: true },
    departamento: String,
    distrito: String,
    telefono: String,
    proyectos: { type: Array, "default": [] },
    experiencias: { type: Array, "default": [] },
    skills: { type: Array, "default": [] },
    idiomas: { type: Array, "default": [] },
    estudios: { type: Array, "default": [] },
    links_ref: { type: Array, "default": [] },
    link: String,
    fnacimiento: Date,
    tcontrato: String,
    created_at: Date,
    updated_at: Date
});
//# sourceMappingURL=userModel.js.map