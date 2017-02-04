import {Injectable}   from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, AsyncValidatorFn, Validators, FormControl} from "@angular/forms";
import {ItemBase} from "./item/item-base";


@Injectable()
export class DynamicFormService {

  constructor(private fb: FormBuilder) {

  }

  toFG(items: ItemBase<any>[], model?: {}): FormGroup {

    //create formBuilder.group() params
    let formGroupObject: {[key: string]: any;} = {};
    let extra: {[key: string]: any} = {};

    items
      .forEach((item) => {
        let arr = getFormControlParamsArray(item);
        formGroupObject[item['key']] = arr;
      });

    return this.fb.group(formGroupObject, extra);

    /////////////////////////////

    function getFormControlParamsArray(item: ItemBase<any>): Array<any> {
      //define FormControl params in the right order
      let formState: any;
      let validator: ValidatorFn | ValidatorFn[];
      let asyncValidator: AsyncValidatorFn | AsyncValidatorFn[];
      //define array of params
      let fCParams: Array<any> = [];

      if (item['formState'] !== undefined) {
        fCParams.push(item['formState']);
      } else {
        fCParams.push('');
      }

      console.log('item:  ',item);
      if (item['validator'] !== undefined && item['validator'].length > 0) {
       //@TODO implement map to angular validators
        fCParams.push(Validators.required);
      } else {
        fCParams.push([]);
      }

      if ('asyncValidator' in item) {
        fCParams.push(item['asyncValidator']);
      } else {
        fCParams.push([]);
      }

      return fCParams;
    }

  }


  toFormGroup(items: ItemBase<any>[], model?: {}) {
    items = items || [];
    model = model || {};

    let group: any = {};

    items
      .map(applyModelValue(model))
      .forEach((item: ItemBase<any>) => {

        let formState: any;
        let validator: ValidatorFn | ValidatorFn[];
        let asyncValidator: AsyncValidatorFn | AsyncValidatorFn[];

        //compost validators;
        if ('validator' in item) {
          validator = item.validator;
        }

        if (item.required) {
          validator = Validators.required;
        }

        group[item.key] = new FormControl(item.value || '');
      });
    return new FormGroup(group);

    ////////////

    function applyModelValue(model?: any) {
      return (item: ItemBase<any>) => {
        item.value = model[item.key];
        return item;
      }
    }

  }

}
