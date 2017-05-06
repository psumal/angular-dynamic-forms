import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractControlOptions} from "./item.struckts";
export class TextareaItem extends AbstractFormControlModel {
  controlType = 'textarea';

  constructor(options:IAbstractControlOptions = {}) {
    super(options);
  }
}
