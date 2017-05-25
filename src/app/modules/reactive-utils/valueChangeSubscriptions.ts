import {ChangeSubscriptionResult, ValueChangeSubscriptionFn} from "./value-change-subscriptions-function";
export class ValueChangeSubscriptions {

  static isRendered: ValueChangeSubscriptionFn = (change: any, param: any): ChangeSubscriptionResult => {
    //check if the change is present in params. If true display it.
    return {
      key: "isRendered",
      result: param.indexOf(change) !== -1
    };
  };

}

