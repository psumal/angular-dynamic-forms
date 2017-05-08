import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractFormControlModel} from "./item.struckts";

export class TextboxItem extends AbstractFormControlModel {
  inputType: string;

  constructor(options:IAbstractFormControlModel= {}) {
    super(options);
    this.controlType = 'textbox';
    this.inputType = options['type'] || 'text';
  }

}
