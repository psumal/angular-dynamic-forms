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
          //let extras = this.getFormGroupExtras(conf);
          formGroupObject[conf['key']] = {};
          formGroupObject[conf['key']] = this.toFG(conf['config'], {});
        }
      });
    }

    return this.fb.group(formGroupObject, {});

    /////////////////////////////

  }

  //@TODO move to utils
  getFormGroupExtras = (forgGroupConfig: AbstractFormControlModel<any>) => {

    if(!forgGroupConfig) { return null; }

    //define array of params
    let fGExtras: any = {};

    if ('validator' in forgGroupConfig) {

      console.log('FGV: ', forgGroupConfig);

    //&& Object.keys(forgGroupConfig.validator).length > 0
      let v = forgGroupConfig.validator;
      if( v !== null && v.length > 0 && 'name' in v ) {
        //we have only ine validator in formGroup
        console.log('FG get Validator', v, this.getValidatorFn(v.name, v.params));
        v = v[0];

        fGExtras.validator = this.getValidatorFn(v.name, v.params);
      }
    }
/*
    if ('asyncValidator' in forgGroupConfig) {
      let  av = forgGroupConfig.asyncValidator;
      if( av !== null && av.length > 0 && 'name' in av ) {
        //we have only ine validator in formGroup
        console.log('FG get Async Validator', av, this.getValidatorFn(av.name, av.params));
        av = av[0];
        fGExtras.asyncValidator = this.getValidatorFn(av.name. av.param);
        }
    }
    */

    return Object.keys(fGExtras).length >=1 ? fGExtras: null;
  };

  getFormControlParamsArray = (item: AbstractFormControlModel<any>): Array<any> => {

    //define array of params
    let fCParams: Array<any> = [];

    let formState: any = '';
    let validator: Array<any> = [];
    let asyncValidator: Array<any> = [];

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
      validatorFn = this.NG_VALIDATORS.find( (validatorFn) => {
        console.log('SYNC VALID ', validatorName, validatorFn.name);
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

  getValidators(valdators: any): ValidatorFn[] {
    let validators: any[] = [];

    if (valdators) {
      validators = valdators.map((validatorObj: any) => {
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
          console.log('ASYNC ', validatorName, asyncValidatorFn.name);
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
        console.log('getAsyncValidators: ', validatorObj.name, validatorObj.params);
        return this.getAsyncValidatorFn(validatorObj.name, validatorObj.params)
      })
    }
    return asyncValidators;
  }

}
