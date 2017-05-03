import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {ItemBase} from "./item";
import {changeListenerConfig, IAbstractControlOptions} from "../item.struckts";

export class AbstractFormControlModel<T> extends ItemBase {
  label?:string;
  value?: T;
  required?: boolean;
  validator?:any;
  asyncValidator?:any;
  validatorMessages?:any;
  changeListener?:changeListenerConfig[];


  constructor(options: IAbstractControlOptions<T> = <T>{}) {
    super(options);

    this.label = options.label;
    this.value = options.value;
    this.required = !!options.required;
    this.validator = options.validator || [];
    this.validatorMessages = options.validatorMessages || {};
    this.asyncValidator = options.asyncValidator || [];
    this.changeListener = options.changeListener || [];
  }
}
