import {DynamicFormElementModel} from "./base/form-control";
import {ISelectOption} from "./base/objects/select-option";
import {IDynamicFormElementModel} from "./base/form-control-options";

export class SelectItem extends DynamicFormElementModel {

  options: ISelectOption[] = [];
  visibleOptions: ISelectOption[] = [];
  noOptKey: string;
  multiple: boolean;

  constructor(options: IDynamicFormElementModel) {
    super(options);

    options = options || {} as IDynamicFormElementModel;
    this.controlType = 'select';
    this.noOptKey = options.noOptKey || '';
    this.options = options.options || [];
    this.visibleOptions = this.options;
    this.multiple = !!options.multiple;
  }
}
