"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var ui_components_token_1 = require("../ui-components.token");
var DynamicItemDirective = (function () {
    function DynamicItemDirective(resolver, container, UI_COMPONENTS) {
        this.resolver = resolver;
        this.container = container;
        this.UI_COMPONENTS = UI_COMPONENTS;
    }
    DynamicItemDirective.prototype.ngOnChanges = function () {
        //if component is set up correctly update values
        if (this.component) {
            this.component.instance.config = this.config;
            this.component.instance.group = this.group;
        }
    };
    DynamicItemDirective.prototype.ngOnInit = function () {
        var componentClass = this.getComponent(this.config.controlType);
        if (!componentClass) {
            throw new Error("Trying to use an unsupported type (" + this.config.controlType + "). Check that your components has a static controlTypes array setup with proper types");
        }
        var componentFactory = this.resolver.resolveComponentFactory(componentClass);
        this.component = this.container.createComponent(componentFactory);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    };
    DynamicItemDirective.prototype.getComponent = function (componentName) {
        var component;
        if (this.UI_COMPONENTS) {
            component = this.UI_COMPONENTS.find(function (component) {
                var isComponent = false;
                //custom identifier
                if ('controlTypes' in component) {
                    isComponent = component['controlTypes'].indexOf(componentName) !== -1;
                }
                else {
                    throw new Error("component: " + component.name + " has no custom identifier");
                }
                return (isComponent) ? isComponent : componentName === component.name;
            });
        }
        else {
            throw new Error("No Components provided via UI_COMPONENTS. Import a ui bundle");
        }
        if (!(typeof component === "function")) {
            throw new Error("Component \"" + component + "\" with name " + componentName + " is not provided via UI_COMPONENTS. Maybe your controlType is not present in controlTypes in any component?");
        }
        return component;
    };
    return DynamicItemDirective;
}());
DynamicItemDirective = __decorate([
    core_1.Directive({
        inputs: ['config', 'group'],
        selector: '[dynamicItem]'
    }),
    __param(2, core_1.Optional()), __param(2, core_1.Inject(ui_components_token_1.UI_COMPONENTS)),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ComponentFactoryResolver !== "undefined" && core_1.ComponentFactoryResolver) === "function" && _a || Object, typeof (_b = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _b || Object, Array])
], DynamicItemDirective);
exports.DynamicItemDirective = DynamicItemDirective;
var _a, _b;
//# sourceMappingURL=dynamic-item.directive.js.map