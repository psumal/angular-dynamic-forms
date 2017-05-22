import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractFormControlModel} from "./item.struckts";

export class ButtonItem extends AbstractFormControlModel {

  inputType:string;

  constructor(options:IAbstractFormControlModel) {
    super(options);

    this.controlType = 'button';
    this.inputType = options['type'] || 'button';
  }

}
