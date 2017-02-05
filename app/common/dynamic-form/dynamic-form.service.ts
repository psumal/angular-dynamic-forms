import {Injectable}   from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, AsyncValidatorFn, Validators, FormControl} from "@angular/forms";
import {ItemBase} from "./item/item-base";
import {FormGroupItem} from "./item/formGroup-base";

@Injectable()
export class DynamicFormService {

  constructor(private fb: FormBuilder) {

  }

  toFG(items: ItemBase<any>[] | FormGroupItem[], model?: {}): FormGroup {

    //create formBuilder.group() params
    let formGroupObject: {[key: string]: any;} = {};
    let extra: {[key: string]: any} = {};

    items.forEach((item) => {
        console.log("item['controlType']", item['controlType'], );
        if(item['controlType'] !== 'formGroup') {
          let arr = getFormControlParamsArray(item);
          console.log('getFormControlParamsArray: ', arr);
          formGroupObject[item['key']] = arr;
        }
        else {
          formGroupObject[item['key']] = {};
          console.log('inner items: ', item['items']);
          let fg = this.toFG(item['items'], model[item['key']]);
            console.log('inner formGroupObject: ', fg);
          formGroupObject[item['key']] = fg;
        }
      });

    console.log('formGroupObject: ', formGroupObject);
    return this.fb.group(formGroupObject, extra);

    /////////////////////////////

    function getFormControlParamsArray(item: ItemBase<any>): Array<any> {

      let validCustomValidator = ['email'];
        function validateEmail(fc: FormControl) {
        let EMAIL_REGEXP = "[A-z]";

        return (false) ? null : {
          validateEmail: {
            valid: false
          }
        };
      }

      //define FormControl params in the right order
      let formState: any = '';
      let validator: Array<any> = [];
      let asyncValidator: Array<any> = [];
      //define array of params
      let fCParams: Array<any> = [];

      //form state
      if (item['formState'] !== undefined) {
        formState = item['formState'];
      }
      fCParams.push(formState);

      //valodators

     if (item['validator'] !== undefined && item['validator'].length > 0) {

       console.log("item['validator']: ", item['validator']);
       item['validator'].forEach((item:ItemBase<any>) => {
          if (item['name'] in Validators) {
            if ('params' in item) {
              validator.push(Validators[item['name']].apply(undefined, item['params']));
            }
            else {
              validator.push(Validators[item['name']]);
            }
          }
          else {
         //   console.log("validCustomValidator");
            if(validCustomValidator.indexOf(item['name']) !== -1) {
              validator.push(validateEmail);
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
