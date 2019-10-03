"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomValidators {
    isValidDate(value) {
        if (!value.match(/^\d{4}-\d{2}-\d{2}$/))
            return false;
        const date = new Date(value);
        if (!date.getTime())
            return false;
        return date.toISOString().slice(0, 10) === value;
    }
    suma(a, b) {
        return a + b;
    }
}
exports.CustomValidators = CustomValidators;
//# sourceMappingURL=customValidators.js.map