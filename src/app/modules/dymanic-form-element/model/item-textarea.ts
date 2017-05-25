import {DynamicFormElementModel} from "./base/form-control";
import {IDynamicFormElementModel} from "./base/form-control-options";
export class TextareaItem extends DynamicFormElementModel {

  constructor(options: IDynamicFormElementModel) {
    super(options);
    this.controlType = 'textarea';
  }
}
