import {IItemBaseOptions} from "../item.struckts";
export class ItemBase{
  parentId?:string;
  key: string;
  order: number;
  controlType: string;

  constructor(options: IItemBaseOptions = {}) {


    this.parentId = options.parentId || '';
    this.key = options.key || '';

    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }

  get formPath() {
    return (this.parentId)? `${this.parentId}.${this.key}` : this.key;
  }

}
