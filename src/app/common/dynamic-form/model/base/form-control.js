"use strict";
var AbstractFormControlModel = (function () {
    function AbstractFormControlModel(options) {
        if (options === void 0) { options = {}; }
        this.formPath = [];
        this.formPath = options.formPath || [];
        this.parentId = options.parentId || '';
        this.key = options.key || '';
        this.controlType = options.controlType || '';
        this.label = options.label;
        this.attrs = options.attrs || {};
        this.formState = options.formState;
        this.disabled = options.disabled;
        this.validator = options.validator || [];
        this.validatorMessages = options.validatorMessages || {};
        this.asyncValidator = options.asyncValidator || [];
        this.formatterParser = options.formatterParser || [];
        this.valueChangeSubscriptions = options.valueChangeSubscriptions || [];
        this.controlClass = options.controlClass || [];
        this.wrapperClass = options.wrapperClass || [];
    }
    return AbstractFormControlModel;
}());
exports.AbstractFormControlModel = AbstractFormControlModel;
//# sourceMappingURL=form-control.js.map