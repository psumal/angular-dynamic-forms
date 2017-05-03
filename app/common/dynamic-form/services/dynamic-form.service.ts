import {Injectable, Optional, Inject} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  AsyncValidatorFn,
  Validators,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS
} from "@angular/forms";
import {AbstractFormControlModel} from "../model/base/form-control";

@Injectable()
export class DynamicFormService {

  constructor(private fb: FormBuilder,
              @Optional() @Inject(NG_VALIDATORS) private NG_VALIDATORS: ValidatorFn[],
              @Optional() @Inject(NG_ASYNC_VALIDATORS) private NG_ASYNC_VALIDATORS: AsyncValidatorFn[]) {
  }

  toFG(config: Array<any>, extras?: any): FormGroup {

    //create formBuilder.group() params
    let formGroupObject: {[key: string]: any;} = {};
    let extra: {[key: string]: any} = {};

    if (config && config.length > 0) {

      config.forEach((conf: any) => {
        if (conf['controlType'] !== 'formGroup' && conf['controlType'] !== 'formArray') {
          formGroupObject[conf['key']] = this.getFormControlParamsArray(conf);
        }
        else {
          let extras = this.getFormGroupExtras(conf);
          formGroupObject[conf['key']] = {};
          formGroupObject[conf['key']] = this.toFG(conf['config'], extras);
        }
      });
    }

    return this.fb.group(formGroupObject, extras);

    /////////////////////////////

  }

  //@TODO move to utils
  getFormGroupExtras = (forgGroupConfig: AbstractFormControlModel<any>) => {

    if(!forgGroupConfig) { return null; }

    let fGExtras: any = {};

    if ('validator' in forgGroupConfig) {
      const v = forgGroupConfig.validator;
      if(Array.isArray(v) && v.length > 0) {
        fGExtras.validator = this.getValidators(v)[0];
      }
    }

    if ('asyncValidator' in forgGroupConfig) {
      const av = forgGroupConfig.asyncValidator;
      if(Array.isArray(av) && av.length > 0) {
        fGExtras.asyncValidator = this.getAsyncValidators(av)[0];
      }
    }

    return Object.keys(fGExtras).length >=1 ? fGExtras: null;
  };

  getFormControlParamsArray = (item: AbstractFormControlModel<any>): Array<any> => {

    let fCParams: Array<any> = [];

    let formState: any = '';
    let validator: Array<any> = [];
    let asyncValidator: Array<any> = [];


    //form state
    if (item['formState'] !== undefined) {
      formState = item['formState'];
    }
    fCParams.push(formState);

    //validators
    if (item['validator'] !== undefined && item['validator'].length > 0) {
      validator = this.getValidators(item['validator']);
    }
    fCParams.push(validator);

    //async validators
    if ('asyncValidator' in item) {
      asyncValidator = this.getAsyncValidators(item['asyncValidator']);
    }
    fCParams.push(asyncValidator);

    return fCParams;
  };

  getCustomValidatorFn(validatorName: string): ValidatorFn | undefined {
    let validatorFn;

    if (this.NG_VALIDATORS) {
      validatorFn = this.NG_VALIDATORS.find( (validatorFn) => {
        return validatorName === validatorFn.name
      });
    }

    return validatorFn;
  }

  getValidatorFn(validatorName: string, validatorArgs?: any): ValidatorFn {
    if(!validatorName) { return;}
    let validatorFn = Validators[validatorName] || this.getCustomValidatorFn(validatorName);

    if (!(typeof validatorFn === "function")) {
      throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS`);
    }

    return (validatorArgs)?validatorFn(...validatorArgs):validatorFn;
  }

  getValidators(validators: any): ValidatorFn[] {
    let validators: any[] = [];

    if (validators) {
      validators = validators.map((validatorObj: any) => {
        return this.getValidatorFn(validatorObj.name, validatorObj.params)
      })
    }
    return validators;
  }

  getAsyncValidatorFn(validatorName: string, validatorArgs?: any): any {
    let asyncValidatorFn;

    if (this.NG_ASYNC_VALIDATORS) {

      asyncValidatorFn = this.NG_ASYNC_VALIDATORS.find(
        (asyncValidatorFn) => {
          return validatorName === asyncValidatorFn.name
        });
    }

    if (!(typeof asyncValidatorFn === "function")) {
      throw new Error(`validator "${validatorName}" is not provided via NG_ASYNC_VALIDATORS`);
    }

    return (validatorArgs)?asyncValidatorFn(validatorArgs):asyncValidatorFn;
  }

  getAsyncValidators(config: any): AsyncValidatorFn[] {
    let asyncValidators: any[] = [];

    if (config) {
      asyncValidators = config.map((validatorObj: any) => {
        return this.getAsyncValidatorFn(validatorObj.name, validatorObj.params)
      })
    }
    return asyncValidators;
  }

}
