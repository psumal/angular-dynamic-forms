import {DynamicFormElementModel} from "./base/form-control";
import {ISelectOption} from "./base/objects/select-option";
import {IDynamicFormElementModel} from "./base/form-control-options";

export class RadioItem extends DynamicFormElementModel {

  inputType:string;
  options: ISelectOption[] = [];
  visibleOptions:ISelectOption[] = [];

  constructor(options:IDynamicFormElementModel) {
    super(options);

    options = options || {} as IDynamicFormElementModel;
    this.inputType = 'radio';
    this.controlType = 'radio';
    this.options = options.options || [];
    this.visibleOptions = this.options;

  }

}
