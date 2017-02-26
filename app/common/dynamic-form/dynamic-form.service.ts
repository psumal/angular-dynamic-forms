import {Injectable, Optional, Inject}   from '@angular/core';
import {
  FormBuilder, FormGroup, ValidatorFn, AsyncValidatorFn, Validators, FormControl,
  NG_VALIDATORS, NG_ASYNC_VALIDATORS
} from "@angular/forms";
import {ItemBase} from "./item/item-base";
import {FormGroupItem} from "./item/formGroup/formGroup-base";

export type DynamicValidatorsMap = {[validatorName: string]: any};

@Injectable()
export class DynamicFormService {

  constructor(private fb: FormBuilder,
              @Optional() @Inject(NG_VALIDATORS) private NG_VALIDATORS: ValidatorFn[],
              @Optional() @Inject(NG_ASYNC_VALIDATORS) private NG_ASYNC_VALIDATORS: AsyncValidatorFn[]) {

  }

  getCustomValidatorFn(validatorName: string): ValidatorFn | AsyncValidatorFn | undefined {

    let validatorFn;

    if (this.NG_VALIDATORS) {

      validatorFn = this.NG_VALIDATORS.find(validatorFn => {
        console.log('validatorFn.name: ', validatorFn.name);
        return validatorName === validatorFn.name || (validatorFn(new FormControl()) as Object).hasOwnProperty(validatorName);
      });
    }

    if (!validatorFn && this.NG_ASYNC_VALIDATORS) {
      validatorFn = this.NG_ASYNC_VALIDATORS.find(asyncValidatorFn => validatorName === asyncValidatorFn.name);
    }

    return validatorFn;
  }


  getValidatorFn(validatorName: string, validatorArgs?: any): ValidatorFn | AsyncValidatorFn | never {

    let validatorFn = Validators[validatorName] || this.getCustomValidatorFn(validatorName);

    if (!(typeof validatorFn === "function")) {
      throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS or NG_ASYNC_VALIDATORS`);
    }

    return validatorArgs ? validatorFn(validatorArgs) : validatorFn;
  }


  getValidators(config: any): ValidatorFn[] | AsyncValidatorFn[] {

    return config ?
      config.map((validatorObj) => {console.log('validatorName: ', validatorObj); this.getValidatorFn(validatorObj.name, config[validatorObj.name])}) : [];
  }


  toFG(items: Array<any>, model?: {}): FormGroup {

    //create formBuilder.group() params
    let formGroupObject: {[key: string]: any;} = {};
    let extra: {[key: string]: any} = {};

    items.forEach((item:any) => {
      if (item['controlType'] !== 'formGroup') {
        formGroupObject[item['key']] = this.getFormControlParamsArray(item);
      }
      else {
        formGroupObject[item['key']] = {};
        formGroupObject[item['key']] = this.toFG(item['items'], model[item['key']]);
      }
    });

    console.log('formGroupObject: ', formGroupObject);
    return this.fb.group(formGroupObject, extra);

    /////////////////////////////


  }

  getFormControlParamsArray = (item: ItemBase<any>): Array<any> => {

  //define FormControl params in the right order
  let formState: any = '';
  let validator: Array<any> = [];
  let asyncValidator: Array<any> = [];
  //define array of params
  let fCParams: Array<any> = [];
  let changeListener: Array<any> = [];

  //form state
  if (item['formState'] !== undefined) {
    formState = item['formState'];
  }
  fCParams.push(formState);

  //validators
  if (item['validator'] !== undefined && item['validator'].length > 0) {

    console.log("item['validator']: ", item['validator']);

    console.log('dynVal', this.getValidators(item['validator']));

    (<Array<any>>item['validator']).forEach((item:any) => {
      if (item['name'] in Validators) {
        if ('params' in item) {
          validator.push(Validators[item['name']].apply(undefined, item['params']));
        }
        else {
          validator.push(Validators[item['name']]);
        }
      }
    });

  }

  fCParams.push(validator);

  //async validators
  if ('asyncValidator' in item) {
    asyncValidator.push(item['asyncValidator']);
  }
  fCParams.push(asyncValidator);

  return fCParams;

}

}
