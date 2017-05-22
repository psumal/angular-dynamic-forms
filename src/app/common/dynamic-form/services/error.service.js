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
var ErrorService = (function () {
    function ErrorService() {
        //this.DEFAULT_ERROR_MAP = esc.DEFAULT_ERROR_MAP || this.DEFAULT_ERROR_MAP;
        //this.REPLACE_WRAPPER_TAG = esc.REPLACE_WRAPPER_TAG || this.REPLACE_WRAPPER_TAG;
        //this.DEFAULT_ERROR = esc.DEFAULT_ERROR || this.DEFAULT_ERROR;
        this.REPLACE_KEYS = {
            controlValue: "cv",
            controlLabel: "cl",
            validatorName: "vn",
            validatorParam: "vp"
        };
        this.REPLACE_WRAPPER_TAG = "span";
        this.DEFAULT_ERROR = 'No message given for validator %vn on field %cl is invalid';
        this.DEFAULT_ERROR_MAP = {
            required: "The Field %cl is required",
            minLength: "The Field %cl should have a min length of %vp",
            maxLength: "The Field %cl should have a max length of %vp",
            pattern: "The Field %cl is not of pattern %vp",
            //custom validators
            controlMatch: "The Field %cl is should be equal with all of %vpn",
            someOf: "The Field %cl is should be equal with all of %vpn"
        };
        this.errorMap = this.DEFAULT_ERROR_MAP;
    }
    ErrorService.prototype.getErrors = function (formGroupOrControl) {
        var errors = {};
        return (formGroupOrControl && 'errors' in formGroupOrControl) ? formGroupOrControl.errors : {};
    };
    ErrorService.prototype.getErrorMsgByErrors = function (errorKeys, config, group) {
        var mappedErrors = {};
        var errorMessage;
        for (var validatorName in errorKeys) {
            errorMessage = this.DEFAULT_ERROR;
            if (validatorName in this.errorMap) {
                errorMessage = this.errorMap[validatorName];
            }
            if ('validatorMessages' in config && config.validatorMessages[validatorName]) {
                errorMessage = config.validatorMessages[validatorName];
            }
            var replaceValues = this.getReplaceValues(config, group, validatorName, errorKeys[validatorName]);
            mappedErrors[validatorName] = this.prePareMessage(errorMessage, replaceValues);
        }
        return mappedErrors;
    };
    ErrorService.prototype.prePareMessage = function (error, replaceValues) {
        var prepMsg = error;
        for (var key in replaceValues) {
            prepMsg = prepMsg.replace('%' + key, "<" + this.REPLACE_WRAPPER_TAG + ">" + replaceValues[key] + "</" + this.REPLACE_WRAPPER_TAG + ">");
        }
        return prepMsg;
    };
    ErrorService.prototype.getReplaceValues = function (config, group, validatorName, errorObj) {
        var replaceValues = {};
        replaceValues[this.REPLACE_KEYS.controlValue] = group.value;
        replaceValues[this.REPLACE_KEYS.controlLabel] = config.label;
        replaceValues[this.REPLACE_KEYS.validatorName] = validatorName;
        replaceValues[this.REPLACE_KEYS.validatorParam] = errorObj;
        return replaceValues;
    };
    return ErrorService;
}());
ErrorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ErrorService);
exports.ErrorService = ErrorService;
//# sourceMappingURL=error.service.js.map