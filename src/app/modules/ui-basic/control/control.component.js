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
var ControlComponent = (function () {
  function ControlComponent(dfs) {
    var _this = this;
    this.dfs = dfs;
    this.subscriptions = [];
    this._isRendered = true;
    //sideEffects
    this.onValueSubscriptionChanged = function ($event) {
      var name = $event.name;
      switch (name) {
        case 'isRendered':
          _this.isRendered = $event.result;
          break;
      }
    };
  }

  Object.defineProperty(ControlComponent.prototype, "config", {
    get: function () {
      return this._config;
    },
    set: function (config) {
      this._config = this.dfs.createFormItem(config);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ControlComponent.prototype, "group", {
    get: function () {
      return this._group;
    },
    set: function (group) {
      this._group = group;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ControlComponent.prototype, "isRendered", {
    get: function () {
      return this._isRendered;
    },
    set: function (value) {
      this._isRendered = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ControlComponent.prototype, "currentFormItem", {
    get: function () {
      if (this.group.get(this.config.key)) {
        return this.group.get(this.config.key);
      }
    },
    enumerable: true,
    configurable: true
  });
  ControlComponent.prototype.ngOnInit = function () {
    this.dfs.addControlConfigToGroup(this.group, this.config);
    //this.subscriptions = this.dfes.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged)
  };
  ControlComponent.prototype.ngOnDestroy = function () {
    this.dfs.removeConfigFromGroup(this.group, this.config);
  };
  //View helper
  ControlComponent.prototype.isControlTypeVisible = function (controlType) {
    return this.config.controlType === controlType;
  };
  ControlComponent.prototype.getControlClass = function () {
    var classNames = [];
    if (this.config.controlType === 'radio' || this.config.controlType === 'checkbox') {
      classNames.push('form-check');
    }
    else if (this.config.controlType === 'textbox' && this.config.inputType === 'file') {
      classNames.push('form-control-file');
    }
    else {
      classNames.push('form-control');
    }
    return classNames.join('');
  };
  ControlComponent.prototype.getCurrentValue = function () {
    if (this.currentFormItem && 'value' in this.currentFormItem) {
      return this.currentFormItem.value;
    }
  };
  ControlComponent.prototype.getCurrentStatus = function () {
    if (this.currentFormItem && 'status' in this.currentFormItem) {
      return this.currentFormItem.status;
    }
  };
  ControlComponent.prototype.getValidationClass = function () {
    var classNames = [];
    if (this.currentFormItem.valid && (this.currentFormItem.touched && this.currentFormItem.dirty)) {
      classNames.push('has-success');
    }
    if (!this.currentFormItem.valid && (this.currentFormItem.touched && this.currentFormItem.dirty)) {
      classNames.push('has-danger');
    }
    return classNames.join(' ');
  };
  ControlComponent.prototype.isNoOptPresent = function () {
    return 'noOptKey' in this.config && !!this.config['noOptKey'];
  };
  ControlComponent.prototype.getNoOptText = function () {
    var text = "-- noOpt --";
    if ('noOptKey' in this.config && this.config['noOptKey'] && this.config['noOptKey'] !== true) {
      text = this.config['noOptKey'];
    }
    return text;
  };
  return ControlComponent;
}());
ControlComponent.controlTypes = ["select", "checkbox", "radio", "textbox", "textarea"];
ControlComponent = __decorate([
  core_1.Component({
    inputs: ['config', 'group'],
    selector: 'df-control',
    templateUrl: 'control.component.html',
  }),
  __metadata("design:paramtypes", [dynamic_form_service_1.DynamicFormService])
], ControlComponent);
exports.ControlComponent = ControlComponent;
//# sourceMappingURL=control.component.js.map
