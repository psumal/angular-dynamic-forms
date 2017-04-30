import {IItemBaseOptions} from "../item.struckts";
export class ItemBase{
  parentId?:string;
  key: string;
  formPath: string[] = [];
  order: number;
  controlType: string;

  constructor(options: IItemBaseOptions = {}) {

    this.formPath = options.formPath || [];
    this.parentId = options.parentId || '';
    this.key = options.key || '';

    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }


}
