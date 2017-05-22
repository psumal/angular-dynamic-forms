import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractFormControlModel} from "./item.struckts";
export class TextareaItem extends AbstractFormControlModel {

  constructor(options:IAbstractFormControlModel = {}) {
    super(options);
    this.controlType = 'textarea';
  }
}
