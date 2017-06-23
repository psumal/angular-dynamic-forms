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
var error_service_1 = require("./messages.service");
var ControlErrorComponent = (function () {
  function ControlErrorComponent(errorService) {
    this._errors = {};
    this.subscriptions = [];
    this.errorService = errorService;
  }

  Object.defineProperty(ControlErrorComponent.prototype, "config", {
    get: function () {
      return this._config;
    },
    set: function (config) {
      this._config = config;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ControlErrorComponent.prototype, "group", {
    get: function () {
      return this._group;
    },
    set: function (group) {
      this._group = group;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ControlErrorComponent.prototype, "errors", {
    get: function () {
      return this._errors;
    },
    set: function (errors) {
      errors = errors || {};
      this._errors = errors;
      this.errorMessages = this.errorService.getErrorMsgByErrors(errors, this.config, this.group);
    },
    enumerable: true,
    configurable: true
  });
  ControlErrorComponent.prototype.ngOnInit = function () {
    var _this = this;
    this.updateErrors();
    if (this.group && 'statusChanges' in this.group) {
      var sub = this.group.statusChanges
        .subscribe(function (status) {
          _this.updateErrors();
        });
      this.subscriptions.push(sub);
    }
  };
  ControlErrorComponent.prototype.ngOnDestroy = function () {
    this.subscriptions.forEach(function (subscription) {
      try {
        subscription.unsubscribe();
      }
      catch (e) {
      }
    });
  };
  ControlErrorComponent.prototype.updateErrors = function () {
    this.errors = this.errorService.getErrors(this.group);
  };
  ControlErrorComponent.prototype.errorKeys = function () {
    return Object.keys(this.errors) || [];
  };
  ControlErrorComponent.prototype.errorVisible = function () {
    return this.group.invalid && (this.group.touched && this.group.dirty);
  };
  ControlErrorComponent.prototype.getClassNames = function () {
    return "form-control-feedback";
  };
  return ControlErrorComponent;
}());
ControlErrorComponent = __decorate([
  core_1.Component({
    moduleId: module.id,
    inputs: ['config', 'group'],
    selector: 'messages',
    templateUrl: 'src/app/modules/messages/messages.component.html'
  }),
  __metadata("design:paramtypes", [error_service_1.ErrorService])
], ControlErrorComponent);
exports.ControlErrorComponent = ControlErrorComponent;
//# sourceMappingURL=errors.component.js.map
