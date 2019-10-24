"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cvController_1 = require("../controllers/cvController");
class CvRoutes {
    constructor() {
        this.cvController = new cvController_1.CvController();
    }
    routes(app) {
        app.route('/micv/:person').get(this.cvController.getCVData);
    }
}
exports.CvRoutes = CvRoutes;
//# sourceMappingURL=cvRoutes.js.map