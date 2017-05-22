"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var dynamic_form_service_1 = require("../services/dynamic-form.service");
var DynamicFormComponent = (function () {
    function DynamicFormComponent(dfs) {
        this.dfs = dfs;
        this.subscriptions = [];
        this.onGroupValueChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(DynamicFormComponent.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (config) {
            this._config = __assign({}, config);
            this.items = config.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (items) {
            this._items = items || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormComponent.prototype, "group", {
        get: function () {
            return this._group;
        },
        set: function (group) {
            this._group = group;
        },
        enumerable: true,
        configurable: true
    });
    DynamicFormComponent.prototype.configToFormConfig = function (config) {
        var _this = this;
        return config.map(function (conf) {
            var newItem = {};
            if (conf['controlType'] == "formGroup") {
                newItem = _this.dfs.createFormItem(conf);
                newItem['config'] = _this.configToFormConfig(conf.config);
            }
            else {
                newItem = _this.dfs.createFormItem(conf);
            }
            return newItem;
        });
    };
    DynamicFormComponent.prototype.ngOnInit = function () {
        this.initSubscriptions();
    };
    DynamicFormComponent.prototype.ngOnDestroy = function () {
        this.destroySubscriptions();
    };
    DynamicFormComponent.prototype.initSubscriptions = function () {
        var _this = this;
        if (this.group) {
            var valueChanges = this.group.valueChanges;
            this.subscriptions.push(valueChanges.subscribe(function (change) {
                _this.onGroupValueChanged.emit({ change: change });
            }));
        }
    };
    DynamicFormComponent.prototype.destroySubscriptions = function () {
        this.subscriptions.forEach(function (sub) {
            try {
                sub.unsubscribe();
            }
            catch (e) {
            }
        });
        this.subscriptions = [];
    };
    return DynamicFormComponent;
}());
DynamicFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        inputs: ['config', 'group'],
        outputs: ['onGroupValueChanged'],
        selector: 'dynamic-form-group',
        templateUrl: './dynamic-form.component.html',
        providers: [dynamic_form_service_1.DynamicFormService]
    }),
    __metadata("design:paramtypes", [dynamic_form_service_1.DynamicFormService])
], DynamicFormComponent);
exports.DynamicFormComponent = DynamicFormComponent;
//# sourceMappingURL=dynamic-form.component.js.map