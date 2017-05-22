"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var form_control_1 = require("./base/form-control");
var CheckboxItem = (function (_super) {
    __extends(CheckboxItem, _super);
    function CheckboxItem(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'checkbox';
        _this.inputType = options.inputType || 'checkbox';
        return _this;
    }
    return CheckboxItem;
}(form_control_1.AbstractFormControlModel));
exports.CheckboxItem = CheckboxItem;
//# sourceMappingURL=item-checkbox.js.map