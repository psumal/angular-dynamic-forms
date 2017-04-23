import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {ItemBase} from "./item";
import {changeListenerConfig, IAbstractControlOptions} from "../item.struckts";

export class AbstractFormControlModel<T> extends ItemBase {
  value?: T;
  required?: boolean;
  validator?:ValidatorFn | ValidatorFn[];
  asyncValidator?:AsyncValidatorFn | AsyncValidatorFn[];
  changeListener?:changeListenerConfig[];

  constructor(options: IAbstractControlOptions<T> = <T>{}) {
    super(options);

    this.value = options.value;
    this.required = !!options.required;
    this.validator = options.validator || [];
    this.asyncValidator = options.asyncValidator || [];
    this.changeListener = options.changeListener || [];
  }
}
