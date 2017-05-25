"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var form_config_selector_component_1 = require("./form-config-selector.component");
var dynamic_form_module_1 = require("../../../common/dynamic-form/dynamic-form.module");
var EXPORTS = [form_config_selector_component_1.FormConfigSelectorComponent];
var FormConfigSelectorModule = (function () {
  function FormConfigSelectorModule() {
  }

  return FormConfigSelectorModule;
}());
FormConfigSelectorModule = __decorate([
  core_1.NgModule({
    imports: [common_1.CommonModule, forms_1.ReactiveFormsModule, dynamic_form_module_1.DynamicFormModule],
    exports: [EXPORTS],
    declarations: [EXPORTS],
  })
], FormConfigSelectorModule);
exports.FormConfigSelectorModule = FormConfigSelectorModule;
//# sourceMappingURL=form-config-selector.module.js.map
