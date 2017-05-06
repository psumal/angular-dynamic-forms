import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {ItemBase} from "./item";
import {changeListenerConfig, IAbstractControlOptions} from "../item.struckts";

export class AbstractFormControlModel extends ItemBase {
  label?:string;
  attrs?:any;
  formState?:any;
  disabled:boolean;
  required?: boolean;
  validator?:any;
  asyncValidator?:any;
  validatorMessages?:any;
  formatterParser?:any[];
  changeListener?:changeListenerConfig[];


  constructor(options: IAbstractControlOptions = {}) {
    super(options);

    this.label = options.label;
    this.attrs = options.attrs;
    console.log('o.v: ', options['value']);
    this.formState = options.formState;
    this.disabled = options.disabled;
    this.required = !!options.required;
    this.validator = options.validator || [];
    this.validatorMessages = options.validatorMessages || {};
    this.asyncValidator = options.asyncValidator || [];
    this.formatterParser = options.formatterParser || [];
    this.changeListener = options.changeListener || [];
  }
}
