import {AbstractFormControlModel} from "./model/base/form-control";
import { FormGroup } from '@angular/forms';


export interface IDynamicFormOnPayLoadChangeEvent {
  //@TODO Implement a type
  payLoad:{};
}

export interface IDynamicFormBindings{
  items: AbstractFormControlModel[];
  onPayloadChange:any;
}

export interface DynamicItem {
  config: any,
  group: FormGroup
}

