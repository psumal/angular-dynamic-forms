import {FormArray, FormControl, FormGroup} from "@angular/forms";
export interface ValueChangeSubscriptionResult {
  name: string;
  result: any;
};

export interface ValueChangeSubscriptionFn {
  (change: any, param?: any, item?: any, form?: FormGroup | FormArray | FormControl): ValueChangeSubscriptionResult;
}
