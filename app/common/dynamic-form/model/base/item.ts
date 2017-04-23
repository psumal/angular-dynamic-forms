import {IItemBaseOptions} from "../item.struckts";
export class ItemBase{
  key: string;
  formPath?:string;
  order: number;
  controlType: string;

  constructor(options: IItemBaseOptions = {}) {
    this.formPath = options.formPath;
    this.key = options.key || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}
