import {StateSubscriptionFn} from "./state-subscriptions-function";
export class StateSubscriptions {

  static myFunction:StateSubscriptionFn<string> = (change, param) => {
      return {
        key: "myFunction",
        result : "something"
      };
  };

}


