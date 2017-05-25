"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
var form_control_1 = require("./base/form-control");
var RadioItem = (function (_super) {
  __extends(RadioItem, _super);
  function RadioItem(options) {
    if (options === void 0) {
      options = {};
    }
    var _this = _super.call(this, options) || this;
    _this.options = [];
    _this.visibleOptions = [];
    _this.inputType = 'radio';
    _this.controlType = 'radio';
    _this.options = options.options || [];
    _this.visibleOptions = _this.options;
    return _this;
  }

  return RadioItem;
}(form_control_1.DynamicFormElementModel));
exports.RadioItem = RadioItem;
//# sourceMappingURL=item-radio.js.map
