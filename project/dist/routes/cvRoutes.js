"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CvRoutes {
    routes(app) {
        app.route('/cv')
            .get((req, res) => {
            res.render('cv/cv', { title: 'Express' });
        });
    }
}
exports.CvRoutes = CvRoutes;
//# sourceMappingURL=cvRoutes.js.map