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
var dynamic_form_service_1 = require("../../dynamic-form/services/dynamic-form.service");
var FormGroupComponent = (function () {
  function FormGroupComponent(dfs) {
    this.dfs = dfs;
    this._items = [];
  }

  Object.defineProperty(FormGroupComponent.prototype, "config", {
    get: function () {
      return this._config;
    },
    set: function (config) {
      this._config = config;
      this.items = config['config'];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FormGroupComponent.prototype, "group", {
    get: function () {
      return this._group;
    },
    set: function (group) {
      this._group = group;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FormGroupComponent.prototype, "items", {
    get: function () {
      return this._items || [];
    },
    set: function (value) {
      var _this = this;
      this._items = value
        .map(function (item) {
          var newItem = _this.dfs.createFormItem(item);
          if (newItem) {
            return newItem;
          }
        });
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FormGroupComponent.prototype, "currentFormItem", {
    get: function () {
      return this.group.get(this.config.key);
    },
    enumerable: true,
    configurable: true
  });
  FormGroupComponent.prototype.ngOnInit = function () {
    this.dfs.addControlConfigToGroup(this.group, this.config);
  };
  return FormGroupComponent;
}());
FormGroupComponent.controlTypes = ["formGroup"];
FormGroupComponent = __decorate([
  core_1.Component({
    moduleId: module.id,
    inputs: ['config', 'group'],
    selector: 'df-form-group',
    templateUrl: 'item-formGroup.component.html',
    providers: [dynamic_form_service_1.DynamicFormService]
  }),
  __metadata("design:paramtypes", [dynamic_form_service_1.DynamicFormService])
], FormGroupComponent);
exports.FormGroupComponent = FormGroupComponent;
//# sourceMappingURL=item-formGroup.component.js.map
