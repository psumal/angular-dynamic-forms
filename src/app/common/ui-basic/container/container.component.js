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
var dynamic_form_service_1 = require("../../dynamic-form/services/dynamic-form.service");
require("rxjs/Rx");
var ContainerComponent = (function () {
    function ContainerComponent(dfs) {
        var _this = this;
        this.dfs = dfs;
        this.subscriptions = [];
        this._items = [];
        this._isRendered = true;
        this.onValueSubscriptionChanged = function ($event) {
            var name = $event.name;
            switch (name) {
                case 'isRendered':
                    _this.isRendered = $event.result;
                    break;
            }
        };
    }
    Object.defineProperty(ContainerComponent.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (config) {
            this._config = config;
            this.items = this._config.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContainerComponent.prototype, "items", {
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
    Object.defineProperty(ContainerComponent.prototype, "currentFormItem", {
        get: function () {
            return this.group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContainerComponent.prototype, "group", {
        get: function () {
            return this._group;
        },
        set: function (group) {
            this._group = group;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContainerComponent.prototype, "isRendered", {
        get: function () {
            return this._isRendered;
        },
        set: function (value) {
            this._isRendered = value;
        },
        enumerable: true,
        configurable: true
    });
    ContainerComponent.prototype.ngOnInit = function () {
        //this.subscriptions = this.dfs.initValueChangeSubscriptions(this.config, this.group, this.onValueSubscriptionChanged);
    };
    return ContainerComponent;
}());
ContainerComponent.controlTypes = ["container"];
ContainerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        inputs: ['config', 'group'],
        selector: 'container',
        templateUrl: 'container.component.html',
    }),
    __metadata("design:paramtypes", [dynamic_form_service_1.DynamicFormService])
], ContainerComponent);
exports.ContainerComponent = ContainerComponent;
//# sourceMappingURL=container.component.js.map