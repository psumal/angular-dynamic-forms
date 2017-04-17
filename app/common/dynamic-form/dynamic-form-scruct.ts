import {AbstractFormControlModel} from "./model/base/form-control";


export interface IDynamicFormOnPayLoadChangeEvent {
  //@TODO Implement a type
  payLoad:{};
}

export interface IDynamicFormBindings{
  items: AbstractFormControlModel<any>[];
  onPayloadChange:any;
}
