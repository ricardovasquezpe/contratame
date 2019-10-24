"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const Email = require("email-templates");
class Emails {
    sendEmailBienvenida(para, nombre) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "rikardo308@gmail.com",
                pass: "chikichiki123"
            }
        });
        const email = new Email({
            transport: transporter,
            send: true,
            preview: false,
            views: {
                options: {
                    extension: 'ejs',
                },
                root: './templates',
            },
        });
        email.send({
            template: 'email',
            message: {
                from: 'ContrataDev <hola@contratadev.com.pe>',
                to: para,
            },
            locals: {
                name: nombre
            },
        }).then(() => console.log('email has been send!'))
            .catch(console.error);
    }
}
exports.Emails = Emails;
//# sourceMappingURL=emails.js.map