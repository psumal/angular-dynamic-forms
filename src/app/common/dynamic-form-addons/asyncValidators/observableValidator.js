"use strict";
require("rxjs/Rx");
var Rx_1 = require("rxjs/Rx");
function observableValidator(c) {
    return new Rx_1.Observable(function (observer) {
        if (c.value !== "test") {
            observer.next({ observableInvalid: true });
        }
        else {
            observer.next(null);
        }
    });
}
exports.observableValidator = observableValidator;
;
//# sourceMappingURL=observableValidator.js.map