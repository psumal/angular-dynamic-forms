import {Injectable}   from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, AsyncValidatorFn, Validators, FormControl} from "@angular/forms";
import {ItemBase} from "./item/item-base";
import {FormGroupItem} from "./item/formGroup/formGroup-base";

@Injectable()
export class DynamicFormService {

  constructor(private fb: FormBuilder) {

  }

  toFG(items: Array<any>, model?: {}): FormGroup {

    //create formBuilder.group() params
    let formGroupObject: {[key: string]: any;} = {};
    let extra: {[key: string]: any} = {};

    items.forEach((item:any) => {
      if (item['controlType'] !== 'formGroup') {
        formGroupObject[item['key']] = getFormControlParamsArray(item);
      }
      else {
        formGroupObject[item['key']] = {};
        formGroupObject[item['key']] = this.toFG(item['items'], model[item['key']]);
      }
    });

    console.log('formGroupObject: ', formGroupObject);
    return this.fb.group(formGroupObject, extra);

    /////////////////////////////

    function getFormControlParamsArray(item: ItemBase<any>): Array<any> {

      let validCustomValidator = ['email'];

      function validateEmail(fc: FormControl) {
        let email = fc.value;
        let emailValid = email !== '' && email.indexOf('@') !== -1 && email.indexOf('.') !== -1;
        console.log('email', email, fc);
        let obj =  {};

        if(!emailValid) {
          obj['email'] = emailValid;
        }

        return obj
      }


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

      //valodators
      if (item['validator'] !== undefined && item['validator'].length > 0) {

        console.log("item['validator']: ", item['validator']);

        (<Array<any>>item['validator']).forEach((item:any) => {
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
            if (validCustomValidator.indexOf(item['name']) !== -1) {
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
