"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenerateCvRoutes {
    routes(app) {
        app.route('/cv/generate')
            .get((req, res) => {
            res.render('generate/index', { title: 'Express' });
        });
    }
}
exports.GenerateCvRoutes = GenerateCvRoutes;
//# sourceMappingURL=generateCvRoutes.js.map