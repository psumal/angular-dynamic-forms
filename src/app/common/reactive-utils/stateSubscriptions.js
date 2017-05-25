"use strict";
var core_1 = require("@angular/core");
var StateSubscriptions = (function () {
    function StateSubscriptions() {
    }
    return StateSubscriptions;
}());
StateSubscriptions.myFunction = function (change, param) {
    return "test";
};
exports.StateSubscriptions = StateSubscriptions;
exports.STATE_SUBSCRIPTIONS = new core_1.InjectionToken('StateSubscriptions');
//# sourceMappingURL=stateSubscriptions.js.map