import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractFormControlModel, ISelectOption} from "./item.struckts";

export class RadioItem extends AbstractFormControlModel {

  inputType:string;
  options: ISelectOption[] = [];
  visibleOptions:ISelectOption[] = [];

  constructor(options:IAbstractFormControlModel = {}) {
    super(options);
    this.inputType = 'radio';
    this.controlType = 'radio';
    this.options = options.options || [];
    this.visibleOptions = this.options;

  }

}
