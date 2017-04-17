import {AbstractFormControlModel} from "../../model/base/form-control";
export class FormGroupItem{
  key:string;
  title: string;
  items: AbstractFormControlModel<any>[];
  controlType:string = 'formGroup';

  constructor(options: {
    key?:string;
    title?: string,
    items?: AbstractFormControlModel<any>[]

  } = {}) {
    this.key = options.key;
    this.title = options.title || '';
    this.items = options.items || (<Array<any>>[]);
  }
}
