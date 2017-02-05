import {ItemBase} from "./item-base";
export class FormGroupItem{
  key:string;
  title: string;
  items: ItemBase<any>[];
  controlType:string = 'formGroup';

  constructor(options: {
    key?:string;
    title?: string,
    items?: string

  } = {}) {
    this.key = options.key;
    this.title = options.title || '';
    this.items = options.items || [];
  }
}
