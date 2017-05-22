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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var item_button_1 = require("../model/item-button");
var item_formGroup_1 = require("../model/item-formGroup");
var item_textbox_1 = require("../model/item-textbox");
var item_select_1 = require("../model/item-select");
var item_checkbox_1 = require("../model/item-checkbox");
var item_radio_1 = require("../model/item-radio");
var item_textarea_1 = require("../model/item-textarea");
var changeSubscriptions_1 = require("../injects/changeSubscriptions");
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/merge");
require("rxjs/add/operator/startWith");
require("rxjs/Rx");
var Rx_1 = require("rxjs/Rx");
var formatterParser_1 = require("../injects/formatterParser");
var DynamicFormService = (function () {
    function DynamicFormService(fb, NG_VALIDATORS, NG_ASYNC_VALIDATORS, CHANGE_SUBSCRIPTIONS, FORMATTER_PARSER) {
        var _this = this;
        this.fb = fb;
        this.NG_VALIDATORS = NG_VALIDATORS;
        this.NG_ASYNC_VALIDATORS = NG_ASYNC_VALIDATORS;
        this.CHANGE_SUBSCRIPTIONS = CHANGE_SUBSCRIPTIONS;
        this.FORMATTER_PARSER = FORMATTER_PARSER;
        //@TODO move to utils
        this.getFormGroupExtras = function (formGroupConfig) {
            if (!formGroupConfig) {
                return null;
            }
            var fGExtras = {};
            if ('validator' in formGroupConfig) {
                var v = formGroupConfig.validator;
                if (Array.isArray(v) && v.length > 0) {
                    fGExtras.validator = _this.getValidators(v)[0];
                }
            }
            if ('asyncValidator' in formGroupConfig) {
                var av = formGroupConfig.asyncValidator;
                if (Array.isArray(av) && av.length > 0) {
                    fGExtras.asyncValidator = _this.getAsyncValidators(av)[0];
                }
            }
            return Object.keys(fGExtras).length >= 1 ? fGExtras : null;
        };
        this.getFormControlParamsArray = function (item) {
            var fCParams = [];
            var formState = '';
            var validator = [];
            var asyncValidator = [];
            //form state
            if (item['formState'] !== undefined) {
                formState = item['formState'];
            }
            fCParams.push(formState);
            //validators
            if (item['validator'] !== undefined && item['validator'].length > 0) {
                validator = _this.getValidators(item['validator']);
            }
            fCParams.push(validator);
            //async validators
            if ('asyncValidator' in item) {
                asyncValidator = _this.getAsyncValidators(item['asyncValidator']);
            }
            fCParams.push(asyncValidator);
            return fCParams;
        };
    }
    DynamicFormService.prototype.createFormItem = function (config) {
        //prevent side effects
        config = __assign({}, config);
        if (!('controlType' in config)) {
            config['controlType'] = guessControlType(config);
        }
        var controlType = config['controlType'];
        var item;
        if (controlType === "container") {
            item = config;
        }
        if (controlType === "textbox") {
            item = new item_textbox_1.TextboxItem(config);
        }
        if (controlType === "select") {
            item = new item_select_1.SelectItem(config);
        }
        if (controlType === "checkbox") {
            item = new item_checkbox_1.CheckboxItem(config);
        }
        if (controlType === "radio") {
            item = new item_radio_1.RadioItem(config);
        }
        if (controlType === "textarea") {
            item = new item_textarea_1.TextareaItem(config);
        }
        if (controlType === "button") {
            item = new item_button_1.ButtonItem(config);
        }
        if (controlType === "formGroup") {
            item = new item_formGroup_1.FormGroupItem(config);
        }
        return item;
        /////////////////////////////
        function guessControlType(struct) {
            var controlType;
            controlType = "container";
            return controlType;
        }
    };
    DynamicFormService.prototype.getParentForm = function (group) {
        var parent = group.parent;
        if (parent !== undefined) {
            return this.getParentForm(parent);
        }
        return group;
    };
    DynamicFormService.prototype.addConfigToGroup = function (group, config) {
        var configParams = this.getFormControlParamsArray(config);
        var control = (_a = this.fb).control.apply(_a, configParams);
        group.addControl(config.key, control);
        var _a;
    };
    DynamicFormService.prototype.removeConfigFromGroup = function (group, config) {
        group.removeControl(config.key);
    };
    DynamicFormService.prototype.getCustomValidatorFn = function (validatorName) {
        var validatorFn;
        if (this.NG_VALIDATORS) {
            validatorFn = this.NG_VALIDATORS.find(function (validatorFn) {
                return validatorName === validatorFn.name;
            });
        }
        return validatorFn;
    };
    DynamicFormService.prototype.getValidatorFn = function (validatorName, validatorArgs) {
        if (!validatorName) {
            return;
        }
        var validatorFn = forms_1.Validators[validatorName] || this.getCustomValidatorFn(validatorName);
        if (!(typeof validatorFn === "function")) {
            throw new Error("validator \"" + validatorName + "\" is not provided via NG_VALIDATORS");
        }
        return (validatorArgs) ? validatorFn.apply(void 0, validatorArgs) : validatorFn;
    };
    DynamicFormService.prototype.getValidators = function (validatorsConfig) {
        var _this = this;
        var validators = [];
        if (validatorsConfig) {
            validators = validatorsConfig.map(function (validatorObj) {
                return _this.getValidatorFn(validatorObj.name, validatorObj.params);
            });
        }
        return validators;
    };
    DynamicFormService.prototype.getCustomAsyncValidatorFn = function (validatorName, validatorArgs) {
        var asyncValidatorFn;
        if (this.NG_ASYNC_VALIDATORS) {
            asyncValidatorFn = this.NG_ASYNC_VALIDATORS.find(function (asyncValidatorFn) {
                return validatorName === asyncValidatorFn.name;
            });
        }
        if (!(typeof asyncValidatorFn === "function")) {
            throw new Error("validator \"" + validatorName + "\" is not provided via NG_ASYNC_VALIDATORS");
        }
        return (validatorArgs) ? asyncValidatorFn(validatorArgs) : asyncValidatorFn;
    };
    DynamicFormService.prototype.getChangeSubscriptionFn = function (subscriptionName) {
        var subscriptionFn;
        if (this.CHANGE_SUBSCRIPTIONS) {
            subscriptionFn = this.CHANGE_SUBSCRIPTIONS.find(function (subscriptionFn) {
                return subscriptionName === subscriptionFn.name;
            });
        }
        return subscriptionFn;
    };
    DynamicFormService.prototype.getSubscriptionFn = function (subscriptionName) {
        var subscriptionFn = changeSubscriptions_1.ChangeSubscriptions[subscriptionName] || this.getChangeSubscriptionFn(subscriptionName);
        if (!(typeof subscriptionFn === "function")) {
            throw new Error("Subscription \"" + subscriptionName + "\" is not provided via CHANGE_SUBSCRIPTIONS");
        }
        return subscriptionFn;
    };
    DynamicFormService.prototype.getAsyncValidators = function (config) {
        var _this = this;
        var asyncValidators = [];
        if (config) {
            asyncValidators = config.map(function (validatorObj) {
                return _this.getCustomAsyncValidatorFn(validatorObj.name, validatorObj.params);
            });
        }
        return asyncValidators;
    };
    DynamicFormService.prototype.getFormatParseFunction = function (functionName, params) {
        var formatParseFunction;
        if (this.FORMATTER_PARSER) {
            formatParseFunction = this.FORMATTER_PARSER.find(function (formParsFunc) {
                return functionName === formParsFunc.name;
            });
        }
        else {
            throw new Error("No function provided via FORMATTER_PARSER");
        }
        if (!(typeof formatParseFunction === "function")) {
            throw new Error("Formatter or Parser with name " + functionName + " is not provided via FORMATTER_PARSER.");
        }
        return (params) ? formatParseFunction.apply(void 0, params) : formatParseFunction;
    };
    DynamicFormService.prototype.initValueChangeSubscriptions = function (config, group, sideEffect) {
        var _this = this;
        var subscriptions = [];
        if ('valueChangeSubscriptions' in config) {
            var listenerConfig = config.valueChangeSubscriptions || [];
            listenerConfig.forEach(function (listener) {
                var subscriptionFn = _this.getSubscriptionFn(listener.name);
                var form = _this.getParentForm(group);
                var subs = [];
                subs = listener.controls.map(function (cName) { return form.get(cName).valueChanges; });
                //subscribe to changes
                var initialValues = listener.controls.map(function (cName) { return form.get(cName).value; });
                var controlChanges$ = Rx_1.Observable.merge.apply(Rx_1.Observable, subs);
                subscriptions.push(controlChanges$
                    .startWith.apply(controlChanges$, initialValues).subscribe(function (change) {
                    var result = subscriptionFn(change, listener.params, config, group);
                    sideEffect({ name: listener.name, result: result });
                }));
            });
        }
        return subscriptions;
    };
    return DynamicFormService;
}());
DynamicFormService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Optional()), __param(1, core_1.Inject(forms_1.NG_VALIDATORS)),
    __param(2, core_1.Optional()), __param(2, core_1.Inject(forms_1.NG_ASYNC_VALIDATORS)),
    __param(3, core_1.Optional()), __param(3, core_1.Inject(changeSubscriptions_1.CHANGE_SUBSCRIPTIONS)),
    __param(4, core_1.Optional()), __param(4, core_1.Inject(formatterParser_1.FORMATTER_PARSER)),
    __metadata("design:paramtypes", [typeof (_a = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _a || Object, Array, Array, Array, Array])
], DynamicFormService);
exports.DynamicFormService = DynamicFormService;
var _a;
//# sourceMappingURL=dynamic-form.service.js.map