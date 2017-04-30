import {IItemBaseOptions} from "../item.struckts";
export class ItemBase{
  key: string;
  formPath?:string;
  order: number;
  controlType: string;

  constructor(options: IItemBaseOptions = {}, parentId?:string) {
    this.formPath = options.formPath;

    this.key = (parentId)?`${parentId}.${options.key}` : options.key || '';

    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}
