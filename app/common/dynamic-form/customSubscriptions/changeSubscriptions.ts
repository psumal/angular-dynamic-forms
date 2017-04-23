import {FormGroup} from "@angular/forms";
import {InjectionToken} from "@angular/core";

export type ChangeSubscriptionResult = {
  [key: string]: any;
};

export interface ChangeSubscriptionFn<T>{
  (change: any, param?: any, item?: any, form?: FormGroup) : T;
}

export class ChangeSubscriptions {

  static isRendered:ChangeSubscriptionFn<boolean> = (change:any, param: any):boolean => {
    //console.log('is ',change, ' present in ', param, ' => ',  param.indexOf(change) !== -1);
    //check if the change is present in params. If true display it.
    return param.indexOf(change) !== -1;
  };

}

export const CHANGE_SUBSCRIPTIONS: InjectionToken<(Function | ChangeSubscriptions)[]> = new InjectionToken<(Function | ChangeSubscriptions)[]>('CustomSubscriptions');
