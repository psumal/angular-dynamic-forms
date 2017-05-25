"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var form_control_1 = require("./base/form-control");
var TextboxItem = (function (_super) {
    __extends(TextboxItem, _super);
    function TextboxItem(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.controlType = 'textbox';
        _this.inputType = options.inputType || 'text';
        return _this;
    }
    return TextboxItem;
}(form_control_1.DynamicFormElementModel));
exports.TextboxItem = TextboxItem;
//# sourceMappingURL=item-textbox.js.map
