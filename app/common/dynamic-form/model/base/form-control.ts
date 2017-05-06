import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {ItemBase} from "./item";
import {changeListenerConfig, IAbstractControlOptions} from "../item.struckts";

export class AbstractFormControlModel<T> extends ItemBase {
  label?:string;
  value?: T;
  formState?:any;
  disabled:boolean;
  required?: boolean;
  validator?:any;
  asyncValidator?:any;
  validatorMessages?:any;
  formatter?:any;
  parser?:any;
  changeListener?:changeListenerConfig[];


  constructor(options: IAbstractControlOptions<T> = <T>{}) {
    super(options);

    this.label = options.label;
    this.value = options.value;
    this.formState = options.formState;
    this.disabled = options.disabled;
    this.required = !!options.required;
    this.validator = options.validator || [];
    this.validatorMessages = options.validatorMessages || {};
    this.asyncValidator = options.asyncValidator || [];
    this.formatter = options.formatter || [];
    this.parser = options.parser || [];
    this.changeListener = options.changeListener || [];

    console.log('parser', this.parser);
  }
}
