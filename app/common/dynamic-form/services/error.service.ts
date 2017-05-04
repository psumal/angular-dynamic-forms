import {AbstractControl, Validators} from "@angular/forms";
import {AbstractFormControlModel} from "../model/base/form-control";

interface ErrorReplaceKeys {
  controlValue?: string,
  controlLabel?: string,
  validatorName?: string,
  validatorParam?:string
}

export class ErrorService {

  static REPLACE_KEYS: ErrorReplaceKeys = {
    controlValue: "cv",
    controlLabel: "cl",
    validatorName: "vn",
    validatorParam: "vp"
  };

  static DEFAULT_ERROR:string = 'No message given for validator %vn on field %cl is invalid';
  static DEFAULT_ERROR_MAP: {[name: string]: string} = {
    required: "The Field %cl is required",
    minLength: "The Field %cl should have a min length of %vp",
    maxLength: "The Field %cl should have a max length of %vp",
    pattern: "The Field %cl is not of pattern %vp",
    //custom validators
    controlMatch: "The Field %cl is should be equal with all of %vpn",
    someOf: "The Field %cl is should be equal with all of %vpn"
  };

  errorMap:{[key:string]:string};

  constructor() {
    this.errorMap = ErrorService.DEFAULT_ERROR_MAP;
  }

  getErrors(formGroupOrControl:AbstractControl) : {[key:string]:string} {
    let errors = {};
    return (formGroupOrControl && 'errors' in formGroupOrControl)?formGroupOrControl.errors:{};
  }

  getErrorMsgByErrors(errorKeys:{[key:string]:string}, config:AbstractFormControlModel<any>, group:AbstractControl):{} {
    let mappedErrors:any = {};
    let errorMessage:string;

    for (let validatorName in  errorKeys) {
      errorMessage = ErrorService.DEFAULT_ERROR;

      if(validatorName in this.errorMap) {
        errorMessage = this.errorMap[validatorName];
      }

      if('validatorMessages' in config && config.validatorMessages[validatorName]) {
        console.log('config.validatorMessages', config.validatorMessages, validatorName, config.validatorMessages[validatorName]);
        errorMessage = config.validatorMessages[validatorName]
      }


      let replaceValues:ErrorReplaceKeys = this.getReplaceValues(config, group, validatorName, errorKeys[validatorName]);
        mappedErrors[validatorName] = this.prePareMessage(errorMessage, replaceValues);

    }

    return mappedErrors;
  }

  prePareMessage(error:any, replaceValues:ErrorReplaceKeys) {
    let prepMsg = error;
    for(let key in replaceValues) {
      prepMsg = prepMsg.replace('%'+key, `<span>${replaceValues[key]}</span>`);
    }

    return prepMsg;
  }

  getReplaceValues(config:AbstractFormControlModel<any>, group:AbstractControl, validatorName:string, errorObj:any):ErrorReplaceKeys {

    let replaceValues:ErrorReplaceKeys = <ErrorReplaceKeys>{};

    replaceValues[ErrorService.REPLACE_KEYS.controlValue] = group.value;
    replaceValues[ErrorService.REPLACE_KEYS.controlLabel] = config.label;
    replaceValues[ErrorService.REPLACE_KEYS.validatorName] = validatorName;
    replaceValues[ErrorService.REPLACE_KEYS.validatorParam] = errorObj;

    return replaceValues;

  }


}
