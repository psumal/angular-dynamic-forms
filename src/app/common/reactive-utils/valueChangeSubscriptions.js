"use strict";
var core_1 = require("@angular/core");
var ChangeSubscriptions = (function () {
    function ChangeSubscriptions() {
    }
    return ChangeSubscriptions;
}());
ChangeSubscriptions.isRendered = function (change, param) {
    //check if the change is present in params. If true display it.
    return param.indexOf(change) !== -1;
};
exports.ChangeSubscriptions = ChangeSubscriptions;
exports.CHANGE_SUBSCRIPTIONS = new core_1.InjectionToken('CustomSubscriptions');
//# sourceMappingURL=changeSubscriptions.js.map