"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
var form_control_1 = require("./base/form-control");
var ButtonItem = (function (_super) {
  __extends(ButtonItem, _super);
  function ButtonItem(options) {
    var _this = _super.call(this, options) || this;
    _this.controlType = 'button';
    _this.inputType = options['type'] || 'button';
    return _this;
  }

  return ButtonItem;
}(form_control_1.DynamicFormElementModel));
exports.ButtonItem = ButtonItem;
//# sourceMappingURL=item-button.js.map
