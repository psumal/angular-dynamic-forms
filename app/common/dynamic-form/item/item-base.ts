import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";
export class ItemBase<T>{
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  helpText:string;
  validator:ValidatorFn | ValidatorFn[];
  changeListener:Array<any>;

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string,
    helpText?:string
    validator?:ValidatorFn | ValidatorFn[]
    changeListener?:Array<any>;
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.helpText = options.helpText || '';
    this.validator = options.validator || [];
    this.changeListener = options.changeListener;
  }
}
