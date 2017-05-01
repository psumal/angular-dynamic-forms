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
        else if (conf['controlType'] === 'formArray') {
          //formGroupObject[conf['key']] = {};
          //formGroupObject[conf['key']] = this.toFA(conf['config'], model[conf['key']]);
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

  toFA(items: Array<any>, model?: {}): FormGroup {

    //create formBuilder.group() params
    let formGroupObject: {[key: string]: any;} = {};
    let extra: {[key: string]: any} = {};

    items.forEach((item: any) => {
      if (item['controlType'] !== 'formGroup' && item['controlType'] !== 'formArray') {
        formGroupObject[item['key']] = this.getFormControlParamsArray(item);
      }
      else if (item['controlType'] === 'formArray') {

        formGroupObject[item['key']] = this.toFA(item['config'], model[item['key']]);
      }
      else {

        formGroupObject[item['key']] = this.toFG(item['config'], model[item['key']]);
      }
    });

    return this.fb.group(formGroupObject, extra);

  }

  //@TODO move to utils
  getFormGroupExtras = (forgGroupConfig: AbstractFormControlModel<any>) => {

    //define array of params
    let fGExtras: any = {};

    let asyncValidator: AsyncValidatorFn;

    if ('validator' in forgGroupConfig && Object.keys(forgGroupConfig.validator).length > 0) {
      const v = forgGroupConfig.validator;
      console.log('v: ', v);
      if('name' in v) {
        fGExtras.validator = this.getValidatorFn(v.name, v.params);
      }
    }

    if ('asyncValidator' in forgGroupConfig) {
      const av = forgGroupConfig.asyncValidator;
      if('name' in av) {
        fGExtras.asyncValidator = this.getValidatorFn(av.name. av.param);
      }
    }

    return fGExtras;
  };

  getFormControlParamsArray = (item: AbstractFormControlModel<any>): Array<any> => {

    //define array of params
    let fCParams: Array<any> = [];

    let formState: any = '';
    let validator: Array<any> = [];
    let asyncValidator: Array<any> = [];
    let changeListener: Array<any> = [];

    //define FormControl params in the right order in the form control config array

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
      validatorFn = this.NG_VALIDATORS.find(validatorFn => validatorName === validatorFn.name);
    }

    return validatorFn;
  }

  getValidatorFn(validatorName: string, validatorArgs?: any): ValidatorFn {
    let validatorFn = Validators[validatorName] || this.getCustomValidatorFn(validatorName);

    if (!(typeof validatorFn === "function")) {
      console.log('getValidatorFn: ', validatorName, validatorArgs);
      throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS`);
    }

    return (validatorArgs)?validatorFn(...validatorArgs):validatorFn;
  }

  getValidators(valdators: any): ValidatorFn[] {
    let validators: any[] = [];

    console.log('valdators: ', valdators);
    if (valdators) {
      validators = valdators.map((validatorObj: any) => {
        console.log('getValidators: ', validatorObj.name, validatorObj.params);
        return this.getValidatorFn(validatorObj.name, validatorObj.params)
      })
    }
    return validators;
  }

  getAsyncValidatorFn(validatorName: string, validatorArgs?: any): any {

    let asyncValidatorFn;

    if (this.NG_ASYNC_VALIDATORS) {
      asyncValidatorFn = this.NG_ASYNC_VALIDATORS.find(validatorFn => validatorName === validatorFn.name);
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
        console.log('getAsyncValidators: ', validatorObj.name, validatorObj.params);
        return this.getAsyncValidatorFn(validatorObj.name, validatorObj.params)
      })
    }
    return asyncValidators;
  }

}
