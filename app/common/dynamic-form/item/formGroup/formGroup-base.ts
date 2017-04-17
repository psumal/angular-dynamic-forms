import {ItemBase} from "../../model/base/item";
export class FormGroupItem{
  key:string;
  title: string;
  items: ItemBase<any>[];
  controlType:string = 'formGroup';

  constructor(options: {
    key?:string;
    title?: string,
    items?: ItemBase<any>[]

  } = {}) {
    this.key = options.key;
    this.title = options.title || '';
    this.items = options.items || (<Array<any>>[]);
  }
}
