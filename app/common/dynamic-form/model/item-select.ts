import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractControlOptions} from "./item.struckts";

export class SelectItem extends AbstractFormControlModel {
  controlType = 'select';
  options: {key: string, value: string}[] = [];
  visibleOptions:{key: string, value: string}[] = [];
  noOptKey:string;
  multiple:boolean;

  constructor(options:any = {}) {
    super(options);
    this.noOptKey = options['noOptKey'] || false;
    this.options = options['options'] || [];
    this.visibleOptions = this.options;

    this.multiple = !!options.multiple;
  }
}
