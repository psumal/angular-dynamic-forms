"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var core_1 = require("@angular/core");
var FormViewerComponent = (function () {
  function FormViewerComponent() {
    this.config = [];
    this.formModel = {};
  }

  FormViewerComponent.prototype.ngOnInit = function () {
  };
  FormViewerComponent.prototype.ngOnChanges = function (changes) {
    if ('config' in changes && changes['config'] != this.config) {
      this.config = changes['config'].currentValue;
    }
  };
  return FormViewerComponent;
}());
FormViewerComponent = __decorate([
  core_1.Component({
    moduleId: module.id,
    inputs: ['config', 'model'],
    selector: 'form-viewer-comp',
    templateUrl: 'form-viewer.component.html'
  })
], FormViewerComponent);
exports.FormViewerComponent = FormViewerComponent;
//# sourceMappingURL=form-viewer.component.js.map
