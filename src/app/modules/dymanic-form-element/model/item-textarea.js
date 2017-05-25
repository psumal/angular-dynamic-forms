"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
var form_control_1 = require("./base/form-control");
var TextareaItem = (function (_super) {
  __extends(TextareaItem, _super);
  function TextareaItem(options) {
    if (options === void 0) {
      options = {};
    }
    var _this = _super.call(this, options) || this;
    _this.controlType = 'textarea';
    return _this;
  }

  return TextareaItem;
}(form_control_1.DynamicFormElementModel));
exports.TextareaItem = TextareaItem;
//# sourceMappingURL=item-textarea.js.map
