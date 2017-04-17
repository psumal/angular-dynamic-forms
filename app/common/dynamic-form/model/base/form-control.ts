import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {ItemBase} from "./item";

export class AbstractFormControlModel<T> extends ItemBase {
  value: T;
  required: boolean;
  validator:ValidatorFn | ValidatorFn[];
  changeListener:Array<any>;

  constructor(options: {
    value?: T,
    required?: boolean,
    validator?:ValidatorFn | ValidatorFn[]
    changeListener?:Array<any>;
  } = {}) {
    super(options);
    this.value = options.value;
    this.required = !!options.required;
    this.validator = options.validator || [];
    this.changeListener = options.changeListener;
  }
}
