import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";
export class ItemBase<T>{
  key: string;
  order: number;
  controlType: string;

  constructor(options: {
    key?: string,
    order?: number,
    controlType?: string,
  } = {}) {
    this.key = options.key || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}
