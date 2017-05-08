import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractFormControlModel} from "./item.struckts";

export class RadioItem extends AbstractFormControlModel {

  inputType:string;

  constructor(options:IAbstractFormControlModel = {}) {
    super(options);
    this.inputType = 'radio';
    this.controlType = 'radio';
  }
}
