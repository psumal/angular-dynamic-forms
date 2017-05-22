"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var form_control_1 = require("./base/form-control");
var SelectItem = (function (_super) {
    __extends(SelectItem, _super);
    function SelectItem(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.options = [];
        _this.visibleOptions = [];
        _this.controlType = 'select';
        _this.noOptKey = options.noOptKey || '';
        _this.options = options.options || [];
        _this.visibleOptions = _this.options;
        _this.multiple = !!options.multiple;
        return _this;
    }
    return SelectItem;
}(form_control_1.AbstractFormControlModel));
exports.SelectItem = SelectItem;
//# sourceMappingURL=item-select.js.map