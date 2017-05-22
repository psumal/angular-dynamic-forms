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
var core_1 = require("@angular/core");
var InteractionHandlerDirective = (function () {
    function InteractionHandlerDirective(_elementRef) {
        this._elementRef = _elementRef;
    }
    InteractionHandlerDirective.prototype.ngOnInit = function () {
        //this.updateAttributes();
    };
    InteractionHandlerDirective.prototype.updateAttributes = function () {
        var el = this._elementRef.nativeElement;
        var set = function (attr, value, isBoolAttr) {
            if (isBoolAttr) {
                !!value ? el.setAttribute(attr, '') : el.removeAttribute(attr);
                return;
            }
            value === undefined ? el.removeAttribute(attr) : el.setAttribute(attr, value);
        };
        set('accept', this.config.attrs['accept']);
        set('autoComplete', this.config.attrs['autoComplete']);
        set('aria-describedby', this.config.attrs['aria-describedby']);
        set('disabled', this.config.attrs['disabled'], true);
        set('list', this.config.attrs['list']);
        set('max', this.config.attrs['max']);
        set('min', this.config.attrs['min']);
        set('multiple', this.config.attrs['multiple'], true);
        set('step', this.config.attrs['step']);
        set('tabindex', this.config.attrs['tabindex']);
        set('autofocus', this.config.attrs['autofocus']);
        set('maxlength', this.config.attrs['maxlength'], true);
        set('minlength', this.config.attrs['minlength'], true);
        set('name', this.config.attrs['kez']);
        set('ngClass', this.config.attrs['ngClass']);
        set('placeholder', this.config.attrs['placeholder']);
        set('readonly', this.config.attrs['readonly'], true);
        set('required', this.config.attrs['required'], true);
        set('spellcheck', this.config.attrs['spellcheck']);
        set('type', this.config.attrs['type']);
    };
    return InteractionHandlerDirective;
}());
InteractionHandlerDirective = __decorate([
    core_1.Directive({
        inputs: ['config', 'group'],
        outputs: ['valueSubscriptionChanged'],
        selector: '[interactionHandler]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object])
], InteractionHandlerDirective);
exports.InteractionHandlerDirective = InteractionHandlerDirective;
var _a;
//# sourceMappingURL=interaction-handler.directive.js.map