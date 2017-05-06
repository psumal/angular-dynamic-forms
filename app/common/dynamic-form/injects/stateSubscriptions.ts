import {FormGroup} from "@angular/forms";
import {InjectionToken} from "@angular/core";

export type StateSubscriptionResult = {
  [key: string]: any;
};

export interface StateSubscriptionFn<T>{
  (change: any, param?: any, item?: any, form?: FormGroup) : T;
}

export class StateSubscriptions {

  static myFunction:StateSubscriptionFn<string> = (change, param) => {
      return "test";
  };

}

export const STATE_SUBSCRIPTIONS: InjectionToken<(Function | StateSubscriptions)[]> = new InjectionToken<(Function | StateSubscriptions)[]>('StateSubscriptions');

