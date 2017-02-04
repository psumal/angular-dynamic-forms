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

    console.log('items struct',items);
    items
      .forEach((item) => {
        console.log('item: ', item);
        let arr = getFormControlParamsArray(item);
        console.log('arr: ', arr, formGroupObject);
        formGroupObject[item['key']] = arr;
        console.log('formGroupObject: ', formGroupObject);
      });

    console.log('items struct map', JSON.parse(JSON.stringify(formGroupObject)));

    return this.fb.group(formGroupObject, extra);

    /////////////////////////////

    function getFormControlParamsArray(item: ItemBase<any>): Array<any> {
      //define FormControl params in the right order
      let formState: any;
      let validator: ValidatorFn | ValidatorFn[];
      let asyncValidator: AsyncValidatorFn | AsyncValidatorFn[];
      //define array of params
      let fCParams: Array<any> = [];

      if ('formState' in item) {
        fCParams.push(item['formState']);
      }

      if ('validator' in item) {
        fCParams.push(item['validator']);
      }

      if ('asyncValidator' in item) {
        fCParams.push(item['asyncValidator']);
      }

      console.log('fCParams array: ', fCParams);
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
        if ('validators' in item) {
          validator = item.validators;
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
