"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var dynamic_form_component_1 = require("./containers/dynamic-form.component");
var dynamic_item_directive_1 = require("./components/dynamic-item/dynamic-item.directive");
var error_service_1 = require("./services/error.service");
var interaction_handler_directive_1 = require("./components/interaction-handler/interaction-handler.directive");
var formatter_parser_directive_1 = require("./components/formatter-parser/formatter-parser.directive");
var dynamic_form_component_2 = require("./containers/dynamic-form.component");
exports.DynamicFormComponent = dynamic_form_component_2.DynamicFormComponent;
var EXPORTS = [dynamic_form_component_1.DynamicFormComponent, dynamic_item_directive_1.DynamicItemDirective, interaction_handler_directive_1.InteractionHandlerDirective, formatter_parser_directive_1.FormatterParserDirective];
var DynamicFormModule = (function () {
    function DynamicFormModule() {
    }
    return DynamicFormModule;
}());
DynamicFormModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
        exports: [EXPORTS],
        declarations: [EXPORTS],
        providers: [error_service_1.ErrorService]
    })
], DynamicFormModule);
exports.DynamicFormModule = DynamicFormModule;
//# sourceMappingURL=dynamic-form.module.js.map