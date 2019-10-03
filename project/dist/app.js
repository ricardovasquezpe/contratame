"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const indexRoutes_1 = require("./routes/indexRoutes");
const cvRoutes_1 = require("./routes/cvRoutes");
const generateCvRoutes_1 = require("./routes/generateCvRoutes");
const mongoose = require("mongoose");
const path = require("path");
class App {
    constructor() {
        this.app = express();
        this.indexRoutes = new indexRoutes_1.IndexRoutes();
        this.cvRoutes = new cvRoutes_1.CvRoutes();
        this.generateCvRoutes = new generateCvRoutes_1.GenerateCvRoutes();
        this.mongoUrl = 'mongodb://localhost/test';
        this.config();
        this.mongoSetup();
        this.indexRoutes.routes(this.app);
        this.cvRoutes.routes(this.app);
        this.generateCvRoutes.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');
        this.app.set('superSecret', '1029384756');
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map