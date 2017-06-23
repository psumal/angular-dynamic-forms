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
var errors_component_1 = require("../messages/messages.component");
var ui_components_token_1 = require("../dymanic-form-element/ui-components.token");
var button_component_1 = require("./button/button.component");
var control_component_1 = require("./control/control.component");
var item_formGroup_component_1 = require("./formGroup/item-formGroup.component");
var dynamic_form_module_1 = require("../dynamic-form/dynamic-form.module");
var container_component_1 = require("./container/container.component");
var ENTRY_COMPONENTS = [control_component_1.ControlComponent, button_component_1.ButtonComponent, item_formGroup_component_1.FormGroupComponent, errors_component_1.ControlErrorComponent, container_component_1.ContainerComponent];
var EXPORTS = ENTRY_COMPONENTS.slice();
var UiBasicModule = (function () {
  function UiBasicModule() {
  }

  return UiBasicModule;
}());
UiBasicModule = __decorate([
  core_1.NgModule({
    imports: [common_1.CommonModule, forms_1.ReactiveFormsModule, dynamic_form_module_1.DynamicFormModule],
    exports: [EXPORTS],
    declarations: [EXPORTS],
    entryComponents: [
      ENTRY_COMPONENTS
    ],
    providers: [
      {provide: ui_components_token_1.UI_COMPONENTS, useValue: button_component_1.ButtonComponent, multi: true},
      {provide: ui_components_token_1.UI_COMPONENTS, useValue: control_component_1.ControlComponent, multi: true},
      {
        provide: ui_components_token_1.UI_COMPONENTS,
        useValue: item_formGroup_component_1.FormGroupComponent,
        multi: true
      },
      {provide: ui_components_token_1.UI_COMPONENTS, useValue: container_component_1.ContainerComponent, multi: true}
    ]
  })
], UiBasicModule);
exports.UiBasicModule = UiBasicModule;
//# sourceMappingURL=ui-basic.module.js.map
