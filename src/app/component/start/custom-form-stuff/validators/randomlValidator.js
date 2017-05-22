"use strict";
function randomValidator(c) {
    var rndNr = Math.random();
    return (rndNr > 0.5) ? null : {
        randomValidator: {
            actualValue: c.value,
            rndNr: rndNr
        }
    };
}
exports.randomValidator = randomValidator;
;
//# sourceMappingURL=randomlValidator.js.map