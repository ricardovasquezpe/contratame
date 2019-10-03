"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customValidators_1 = require("../util/customValidators");
const customValidators = new customValidators_1.CustomValidators();
describe('Sample Test', () => {
    it('should test that true === true', () => {
        const result = customValidators.suma(3, 4);
        expect(result).toBe(7);
    });
});
//# sourceMappingURL=userTests.test.js.map