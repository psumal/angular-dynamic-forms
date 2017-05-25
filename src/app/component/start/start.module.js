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
var start_component_1 = require("./start.component");
var form_config_service_1 = require("./form-config-selector/form-config.service");
var form_config_selector_module_1 = require("./form-config-selector/form-config-selector.module");
var changeSubscriptions_1 = require("../../modules/reactive-utils/changeSubscriptions");
var ui_components_token_1 = require("../../modules/dymanic-form-element/ui-components.token");
var filteredOptionsSubscription_1 = require("../../modules/dynamic-form-addons/change-subscriptions/filteredOptionsSubscription");
var dynamic_form_module_1 = require("../../modules/dynamic-form/dynamic-form.module");
var ui_basic_module_1 = require("../../modules/ui-basic/ui-basic.module");
var slider_component_1 = require("../../modules/dynamic-form-addons/components/slider/slider.component");
var form_viewer_module_1 = require("./form-viewer/form-viewer.module");
var form_builder_module_1 = require("./form-builder/form-builder.module");
var controlMatchValidator_1 = require("../../modules/dynamic-form-addons/validators/controlMatchValidator");
var dividableByValidator_1 = require("../../modules/dynamic-form-addons/validators/dividableByValidator");
var promiseValidator_1 = require("../../modules/dynamic-form-addons/asyncValidators/promiseValidator");
var observableValidator_1 = require("../../modules/dynamic-form-addons/asyncValidators/observableValidator");
var randomlValidator_1 = require("../../modules/dynamic-form-addons/validators/randomlValidator");
var someOfValidator_1 = require("../../modules/dynamic-form-addons/validators/someOfValidator");
var formatterParser_1 = require("../../modules/dynamic-form/injects/formatterParser");
var maskString_1 = require("../../modules/dynamic-form-addons/formatter-parser/maskString");
var replaceString_1 = require("../../modules/dynamic-form-addons/formatter-parser/replaceString");
var toCapitalized_1 = require("../../modules/dynamic-form-addons/formatter-parser/toCapitalized");
var start_component_2 = require("./start.component");
exports.StartComponent = start_component_2.StartComponent;
var EXPORTS = [start_component_1.StartComponent, slider_component_1.SliderComponent];
var CUSTOM_DEFAULT_ERRORMAP = {
  DEFAULT_ERROR: "Tis value is overridden globally by the ErrorConfigService"
};
var StartModule = (function () {
  function StartModule() {
  }

  return StartModule;
}());
StartModule = __decorate([
  core_1.NgModule({
    imports: [
      common_1.CommonModule,
      forms_1.ReactiveFormsModule,
      form_config_selector_module_1.FormConfigSelectorModule,
      dynamic_form_module_1.DynamicFormModule,
      ui_basic_module_1.UiBasicModule,
      form_viewer_module_1.FormViewerModule,
      form_builder_module_1.FormBuilderModule
    ],
    exports: [EXPORTS],
    declarations: [EXPORTS],
    entryComponents: [slider_component_1.SliderComponent],
    providers: [
      form_config_service_1.FormConfigService,
      //VALIDATORS Control
      //customValidator for control
      {provide: forms_1.NG_VALIDATORS, useValue: randomlValidator_1.randomValidator, multi: true},
      //customValidator for control with params
      {provide: forms_1.NG_VALIDATORS, useValue: dividableByValidator_1.dividableBy, multi: true},
      //ASYNC_VALIDATORS Control
      //customAsyncValidator for control
      {provide: forms_1.NG_ASYNC_VALIDATORS, useValue: promiseValidator_1.promiseValidator, multi: true},
      {provide: forms_1.NG_ASYNC_VALIDATORS, useValue: observableValidator_1.observableValidator, multi: true},
      //customValidator for control with params
      //@TODO
      //VALIDATORS Group
      {provide: forms_1.NG_VALIDATORS, useValue: controlMatchValidator_1.controlMatch, multi: true},
      {provide: forms_1.NG_VALIDATORS, useValue: someOfValidator_1.someOf, multi: true},
      //customValidator for group with params
      //@TODO
      //ASYNC_VALIDATORS Group
      //{provide: NG_VALIDATORS, useValue: ??????, multi: true}
      //customValidator for group with params
      //@TODO
      //
      {provide: ui_components_token_1.UI_COMPONENTS, useValue: slider_component_1.SliderComponent, multi: true},
      {
        provide: changeSubscriptions_1.CHANGE_SUBSCRIPTIONS,
        useValue: filteredOptionsSubscription_1.filteredOptions,
        multi: true
      },
      {provide: formatterParser_1.FORMATTER_PARSER, useValue: toCapitalized_1.toCapitalized, multi: true},
      {provide: formatterParser_1.FORMATTER_PARSER, useValue: maskString_1.maskString, multi: true},
      {provide: formatterParser_1.FORMATTER_PARSER, useValue: replaceString_1.replaceString, multi: true},
    ]
  })
], StartModule);
exports.StartModule = StartModule;
//# sourceMappingURL=start.module.js.map
