import {ItemBase} from "./base/item";
import {ValidatorFn, AsyncValidatorFn} from "@angular/forms";
import {changeListenerConfig} from "./item.struckts";
import {AbstractFormControlModel} from "./base/form-control";

export class FormGroupItem extends AbstractFormControlModel {

  label: string;
  controlType:string = 'formGroup';

  config: ItemBase[];
  disabled:boolean;
  validator?:ValidatorFn | ValidatorFn[];
  asyncValidator?:AsyncValidatorFn | AsyncValidatorFn[];
  changeListener?:changeListenerConfig[];

  constructor(options: {
    key?:string;
    label?: string,
    disabled?: boolean,
    config?: ItemBase[]
    validator?:ValidatorFn | ValidatorFn[];
    asyncValidator?:AsyncValidatorFn | AsyncValidatorFn[];
    changeListener?:changeListenerConfig[];
  } = {}) {

    super(options);

    this.key = options.key;
    this.label = options.label || '';
    this.disabled = !!options.disabled;
    this.config = options.config || (<ItemBase[]>[]);
    this.validator =  options.validator;
    this.asyncValidator =  options.asyncValidator;
    this.changeListener =  options.changeListener;
  }

}
