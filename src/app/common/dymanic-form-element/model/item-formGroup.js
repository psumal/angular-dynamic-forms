"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
var form_control_1 = require("./base/form-control");
var FormGroupItem = (function (_super) {
  __extends(FormGroupItem, _super);
  function FormGroupItem(options) {
    if (options === void 0) {
      options = {};
    }
    var _this = _super.call(this, options) || this;
    _this.controlType = 'formGroup';
    return _this;
  }

  return FormGroupItem;
}(form_control_1.DynamicFormElementModel));
exports.FormGroupItem = FormGroupItem;
//# sourceMappingURL=item-formGroup.js.map
