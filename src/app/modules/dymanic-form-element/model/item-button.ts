import { DynamicFormElementModel } from './base/form-control';
import { IDynamicFormElementModel } from './base/form-control-options';

export class ButtonItem extends DynamicFormElementModel {

  inputType: string;

  constructor(options: IDynamicFormElementModel) {
    super(options);

    options = options || {} as IDynamicFormElementModel;
    this.controlType = 'button';
    this.inputType = options['type'] || 'button';
  }

}
