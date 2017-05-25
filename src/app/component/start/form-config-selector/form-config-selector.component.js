"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
  };
var core_1 = require("@angular/core");
var form_config_service_1 = require("./form-config.service");
var forms_1 = require("@angular/forms");
var FormConfigSelectorComponent = (function () {
  function FormConfigSelectorComponent(formConfigService) {
    this.formConfigService = formConfigService;
    this.configSelectionConfig = {};
    this.configSelectionForm = new forms_1.FormGroup({});
    this.formConfigs = [];
    this.formConfig = [];
    this.dynamicForm = new forms_1.FormGroup({});
    this.formModel = {};
    this.formConfig = formConfigService.getAddressDataConfig();
    this.formConfigs = formConfigService.getAllFormConfigs();
    this.configSelectionConfig = {
      config: [
        {
          controlType: 'select',
          key: 'configSelect',
          label: 'Config Select',
          options: this.getConfigMap()
        }
      ]
    };
  }

  FormConfigSelectorComponent.prototype.getConfigMap = function () {
    var idMap = this.formConfigs.map(function (config) {
      return {label: config.label, value: config.key};
    });
    return idMap;
  };
  FormConfigSelectorComponent.prototype.getConfigByKey = function (key) {
    return this.formConfigs
      .find(function (config) {
        return config.key == key;
      });
  };
  FormConfigSelectorComponent.prototype.updateFormConfig = function (formValue) {
    console.log('formValue: ', formValue);
    if (formValue || formValue.toString() === '0') {
      var configSet = this.getConfigByKey(formValue);
      console.log('configSet: ', configSet);
      this.formConfig = configSet.config || {};
    }
  };
  FormConfigSelectorComponent.prototype.getModel = function () {
    return this.formModel;
  };
  FormConfigSelectorComponent.prototype.onDynamicFormChange = function ($event) {
    this.formModel = $event.change;
  };
  FormConfigSelectorComponent.prototype.onSubmitConfigSelection = function (form) {
    if (form.valid) {
      this.updateFormConfig(form.value.configSelect);
    }
  };
  return FormConfigSelectorComponent;
}());
FormConfigSelectorComponent = __decorate([
  core_1.Component({
    moduleId: module.id,
    selector: 'form-config-selector-comp',
    templateUrl: 'form-config-selector.component.html'
  }),
  __metadata("design:paramtypes", [form_config_service_1.FormConfigService])
], FormConfigSelectorComponent);
exports.FormConfigSelectorComponent = FormConfigSelectorComponent;
//# sourceMappingURL=form-config-selector.component.js.map
