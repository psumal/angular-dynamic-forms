import {FormArray, FormControl, FormGroup} from "@angular/forms";
export type StateSubscriptionResult = {
  [key: string]: any;
};

export interface StateSubscriptionFn<T>{
  (change: any, param?: any, item?: any, form?: FormGroup | FormArray | FormControl) : StateSubscriptionResult;
}
