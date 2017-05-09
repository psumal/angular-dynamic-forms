import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractFormControlModel, ISelectOption} from "./item.struckts";

export class SelectItem extends AbstractFormControlModel {

  options: ISelectOption[] = [];
  visibleOptions:ISelectOption[] = [];
  noOptKey:string;
  multiple:boolean;

  constructor(options:IAbstractFormControlModel = {}) {
    super(options);

    this.controlType = 'select';

    this.noOptKey = options.noOptKey || '';

    this.options = options.options || [];
    this.visibleOptions = this.options;

    this.multiple = !!options.multiple;
  }
}
