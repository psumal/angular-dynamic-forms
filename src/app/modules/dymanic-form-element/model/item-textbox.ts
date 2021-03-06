import {DynamicFormElementModel} from "./base/form-control";
import {IDynamicFormElementModel} from "./base/form-control-options";

export class TextboxItem extends DynamicFormElementModel {
  inputType: string;

  constructor(options?: IDynamicFormElementModel) {
    super(options);

    options = options || {} as IDynamicFormElementModel;
    this.controlType = 'textbox';
    this.inputType = options.inputType || 'text';
  }

}
