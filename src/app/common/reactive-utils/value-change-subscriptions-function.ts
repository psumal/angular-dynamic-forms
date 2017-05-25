import {FormArray, FormControl, FormGroup} from "@angular/forms";
export type ChangeSubscriptionResult = {
  [key: string]: any;
};

export interface ValueChangeSubscriptionFn{
  (change: any, param?: any, item?: any, form?: FormGroup | FormArray | FormControl) : ChangeSubscriptionResult;
}
