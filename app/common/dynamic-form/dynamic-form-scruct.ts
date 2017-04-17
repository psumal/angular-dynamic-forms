import {ItemBase} from "./model/base/item";


export interface IDynamicFormOnPayLoadChangeEvent {
  //@TODO Implement a type
  payLoad:{};
}

export interface IDynamicFormBindings{
  items: ItemBase<any>[];
  onPayloadChange:any;
}
