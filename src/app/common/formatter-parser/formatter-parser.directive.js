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
var forms_1 = require("@angular/forms");
var dynamic_form_service_1 = require("../dynamic-form/services/dynamic-form.service");
var CONTROL_ACCESSOR = {
  provide: forms_1.NG_VALUE_ACCESSOR,
  useExisting: core_1.forwardRef(function () {
    return FormatterParserDirective;
  }),
  multi: true
};
var FormatterParserDirective = (function () {
  function FormatterParserDirective(elementRef, dfs) {
    this.elementRef = elementRef;
    this.dfs = dfs;
    this.formatterParserView = [];
    this.formatterParserModel = [];
    this.onChange = function (value) {
      return value;
    };
    this.onTouched = function () {
    };
  }

  FormatterParserDirective.prototype.registerOnChange = function (fn) {
    this.onChange = fn;
  };
  FormatterParserDirective.prototype.registerOnTouched = function (fn) {
    this.onTouched = fn;
  };
  FormatterParserDirective.prototype.onBlur = function ($event) {
    this.onTouched();
  };
  FormatterParserDirective.prototype.ngOnInit = function () {
    this.updateFormatterAndParser();
  };
  // Parser: View --> Model
  FormatterParserDirective.prototype.onControlInput = function ($event) {
    var input = $event.target;
    var value = input.value.toString();
    //write value to view
    input.value = this.formatterParserView.reduce(function (state, transform) {
      return transform(state);
    }, value);
    //write value to model
    var modelValue = value ? value : null;
    this.onChange(modelValue);
  };
  // Formatter: Model --> View
  FormatterParserDirective.prototype.writeValue = function (value) {
    var input = this.elementRef.nativeElement;
    //write value to view
    input.value = this.formatterParserView.reduce(function (state, transform) {
      return transform(state);
    }, value);
    //write value to model
    var modelValue = this.formatterParserModel.reduce(function (state, transform) {
      return transform(state);
    }, value);
    this.group.patchValue(modelValue);
  };
  /* Formatter And Parser */
  FormatterParserDirective.prototype.updateFormatterAndParser = function () {
    var _this = this;
    if (!this.config) {
      return;
    }
    if ('formatterParser' in this.config) {
      //setup formatterParser functions for view and model values
      this.config.formatterParser
        .forEach(function (formatterConfig) {
          var fPF = _this.dfs.getFormatParseFunction(formatterConfig.name, formatterConfig.params);
          var t = formatterConfig.target;
          if (t == 0 || t == 2) {
            _this.formatterParserView.push(fPF);
          }
          if (t == 1 || t == 2) {
            _this.formatterParserModel.push(fPF);
          }
        });
    }
  };
  return FormatterParserDirective;
}());
__decorate([
  core_1.HostListener('blur', ['$event']),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Object]),
  __metadata("design:returntype", void 0)
], FormatterParserDirective.prototype, "onBlur", null);
__decorate([
  core_1.HostListener('input', ['$event']),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Object]),
  __metadata("design:returntype", void 0)
], FormatterParserDirective.prototype, "onControlInput", null);
FormatterParserDirective = __decorate([
  core_1.Directive({
    inputs: ['config', 'group'],
    selector: '[formatterParser]',
    providers: [
      CONTROL_ACCESSOR
    ]
  }),
  __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object, dynamic_form_service_1.DynamicFormService])
], FormatterParserDirective);
exports.FormatterParserDirective = FormatterParserDirective;
var _a;
//# sourceMappingURL=formatter-parser.directive.js.map
