
import { DynamicFormElementModel } from '../../../dymanic-form-element/model/base/form-control';
import { ISelectOption } from '../../../dymanic-form-element/model/base/objects/select-option';
import { IDynamicFormElementModel } from '../../../dymanic-form-element/model/base/form-control-options';
export class CustomRadioItem extends DynamicFormElementModel {

  inputType: string;
  options: ISelectOption[] = [];
  visibleOptions: ISelectOption[] = [];

  constructor(options: IDynamicFormElementModel) {
    super(options);

    options = options || {} as IDynamicFormElementModel;
    this.inputType = 'radio';
    this.controlType = 'radio';
    this.options = options.options || [];
    this.visibleOptions = this.options;

  }

}
