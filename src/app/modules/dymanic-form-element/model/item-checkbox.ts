import {DynamicFormElementModel} from "./base/form-control";
import {IDynamicFormElementModel} from "./base/form-control-options";

export class CheckboxItem extends DynamicFormElementModel {

  inputType: string;

  constructor(options: IDynamicFormElementModel) {
    super(options);

    options = options || {} as IDynamicFormElementModel;
    this.controlType = 'checkbox';
    this.inputType = options.inputType || 'checkbox'
  }

}
