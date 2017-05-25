"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var ButtonComponent = (function () {
  function ButtonComponent() {
  }

  Object.defineProperty(ButtonComponent.prototype, "config", {
    get: function () {
      return this._config;
    },
    set: function (config) {
      this._config = config;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ButtonComponent.prototype, "group", {
    get: function () {
      return this._group;
    },
    set: function (group) {
      this._group = group;
    },
    enumerable: true,
    configurable: true
  });
  return ButtonComponent;
}());
ButtonComponent.controlTypes = ["button", "submit", "reset"];
ButtonComponent = __decorate([
  core_1.Component({
    moduleId: module.id,
    inputs: ['config', 'group'],
    selector: 'df-button',
    templateUrl: 'button.component.html',
  })
], ButtonComponent);
exports.ButtonComponent = ButtonComponent;
//# sourceMappingURL=button.component.js.map
