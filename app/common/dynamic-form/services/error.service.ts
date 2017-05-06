import {AbstractControl} from "@angular/forms";
import {AbstractFormControlModel} from "../model/base/form-control";
import {Injectable} from "@angular/core";

interface ErrorReplaceKeys {
  controlValue?: string,
  controlLabel?: string,
  validatorName?: string,
  validatorParam?:string
}

@Injectable()
export class ErrorService {

  REPLACE_KEYS: ErrorReplaceKeys = {
    controlValue: "cv",
    controlLabel: "cl",
    validatorName: "vn",
    validatorParam: "vp"
  };

  REPLACE_WRAPPER_TAG = "span";
  DEFAULT_ERROR:string = 'No message given for validator %vn on field %cl is invalid';
  DEFAULT_ERROR_MAP: {[name: string]: string} = {
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
    //console.log('esc', esc);
    //this.DEFAULT_ERROR_MAP = esc.DEFAULT_ERROR_MAP || this.DEFAULT_ERROR_MAP;
    //this.REPLACE_WRAPPER_TAG = esc.REPLACE_WRAPPER_TAG || this.REPLACE_WRAPPER_TAG;
    //this.DEFAULT_ERROR = esc.DEFAULT_ERROR || this.DEFAULT_ERROR;

    this.errorMap = this.DEFAULT_ERROR_MAP;
  }

  getErrors(formGroupOrControl:AbstractControl) : {[key:string]:string} {
    let errors = {};
    return (formGroupOrControl && 'errors' in formGroupOrControl)?formGroupOrControl.errors:{};
  }

  getErrorMsgByErrors(errorKeys:{[key:string]:string}, config:AbstractFormControlModel, group:AbstractControl):{} {
    let mappedErrors:any = {};
    let errorMessage:string;

    for (let validatorName in  errorKeys) {
      errorMessage = this.DEFAULT_ERROR;

      if(validatorName in this.errorMap) {
        errorMessage = this.errorMap[validatorName];
      }

      if('validatorMessages' in config && config.validatorMessages[validatorName]) {
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
      prepMsg = prepMsg.replace('%'+key, `<${this.REPLACE_WRAPPER_TAG}>${replaceValues[key]}</${this.REPLACE_WRAPPER_TAG}>`);
    }

    return prepMsg;
  }

  getReplaceValues(config:AbstractFormControlModel, group:AbstractControl, validatorName:string, errorObj:any):ErrorReplaceKeys {

    let replaceValues:ErrorReplaceKeys = <ErrorReplaceKeys>{};

    replaceValues[this.REPLACE_KEYS.controlValue] = group.value;
    replaceValues[this.REPLACE_KEYS.controlLabel] = config.label;
    replaceValues[this.REPLACE_KEYS.validatorName] = validatorName;
    replaceValues[this.REPLACE_KEYS.validatorParam] = errorObj;

    return replaceValues;

  }


}
