import {DynamicFormElementModel} from "./base/form-control";
import {IDynamicFormElementModel} from "./base/form-control-options";

export class FormGroupItem extends DynamicFormElementModel {

  controlType: string = 'formGroup';

  constructor(options: IDynamicFormElementModel) {
    super(options);
  }

}
