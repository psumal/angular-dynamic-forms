import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractFormControlModel} from "./item.struckts";

export class CheckboxItem extends AbstractFormControlModel {

  inputType:string;

  constructor(options:IAbstractFormControlModel = {}) {
    super(options);

    this.controlType = 'checkbox';
    this.inputType = options.inputType || 'checkbox'
  }

}
