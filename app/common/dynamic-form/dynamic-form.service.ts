import {Injectable, Optional, Inject} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  AsyncValidatorFn,
  Validators,
  FormControl,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS
} from "@angular/forms";
import {AbstractFormControlModel} from "./model/base/form-control";

@Injectable()
export class DynamicFormService {

  constructor(private fb: FormBuilder,
              @Optional() @Inject(NG_VALIDATORS) private NG_VALIDATORS: ValidatorFn[],
              @Optional() @Inject(NG_ASYNC_VALIDATORS) private NG_ASYNC_VALIDATORS: AsyncValidatorFn[]) {

  }

  toFG(items: Array<any>, model?: {}): FormGroup {

    //create formBuilder.group() params
    let formGroupObject: {[key: string]: any;} = {};
    let extra: {[key: string]: any} = {};

    items.forEach((item: any) => {
      if (item['controlType'] !== 'formGroup') {
        formGroupObject[item['key']] = this.getFormControlParamsArray(item);
      }
      else {
        formGroupObject[item['key']] = {};
        formGroupObject[item['key']] = this.toFG(item['items'], model[item['key']]);
      }
    });

    return this.fb.group(formGroupObject, extra);

    /////////////////////////////

  }

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
      asyncValidator = this.getValidators(item['asyncValidator']);
    }
    fCParams.push(asyncValidator);


    return fCParams;

  }

  getCustomValidatorFn(validatorName: string): ValidatorFn | AsyncValidatorFn | undefined {

    let validatorFn;

    if (this.NG_VALIDATORS) {
      validatorFn = this.NG_VALIDATORS.find(validatorFn => validatorName === validatorFn.name);
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
    let validators: any[] = [];
    if (config) {
      validators = config.map((validatorObj: any) => {
        return this.getValidatorFn(validatorObj.name, config[validatorObj.name])
      })
    }
    return validators;
  }


}
