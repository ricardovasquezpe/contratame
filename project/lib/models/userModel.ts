import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    nombres		 : String,
    apellidos	 : String,
    usuario	     : String,
    password	 : String,
    correo		 : { type: String, required: true, unique: true },
    fnacimiento	 : Date,
    departamento : String,
    distrito     : String,
    telefono     : String,
    created_at   : Date,
    updated_at   : Date
});