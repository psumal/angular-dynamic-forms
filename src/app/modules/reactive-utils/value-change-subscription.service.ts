import {Inject, Injectable, Optional} from "@angular/core";
import {ValueChangeSubscriptionFn} from "./value-change-subscriptions-function";
import {FormArray, FormGroup} from "@angular/forms";

import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/startWith";

import "rxjs/Rx";
import {Observable} from "rxjs/Rx";
import {Subscription} from "rxjs/Subscription";
import {IValueChangeSubscriptionConfig} from "./value-change-subscription-config";
import {ValueChangeSubscriptions} from "./valueChangeSubscriptions";
import {VALUE_CHANGE_SUBSCRIPTIONS} from "./value-change-subscriptions.injectionToken";

@Injectable()
export class ValueChangeSubscriptionService {

  constructor(@Optional() @Inject(VALUE_CHANGE_SUBSCRIPTIONS) private VALUE_CHANGE_SUBSCRIPTIONS: ValueChangeSubscriptionFn[]) {

  }

  getChangeSubscriptionFn(subscriptionName: string): ValueChangeSubscriptionFn | undefined {
    let subscriptionFn;

    if (this.VALUE_CHANGE_SUBSCRIPTIONS) {
      subscriptionFn = this.VALUE_CHANGE_SUBSCRIPTIONS.find(subscriptionFn => {
        return subscriptionName === subscriptionFn.name;
      });
    }

    return subscriptionFn;
  }

  getSubscriptionFn(subscriptionName: string): ValueChangeSubscriptionFn | never {
    let subscriptionFn = ValueChangeSubscriptions[subscriptionName] || this.getChangeSubscriptionFn(subscriptionName);

    if (!(typeof subscriptionFn === "function")) {
      throw new Error(`Subscription "${subscriptionName}" is not provided via CHANGE_SUBSCRIPTIONS`);
    }

    return subscriptionFn;
  }

  initValueChangeSubscriptions(config: { valueChangeSubscriptions?: IValueChangeSubscriptionConfig[] }, group: FormGroup, sideEffect: Function): Subscription[] {
    let subscriptions: Subscription[] = [];

    if ('valueChangeSubscriptions' in config) {
      const listenerConfig = config.valueChangeSubscriptions || [];

      listenerConfig.forEach((listener) => {

        const subscriptionFn: ValueChangeSubscriptionFn = this.getSubscriptionFn(listener.name);

        let form = this.getParentForm(group);
        let subs = listener.controls
          .filter(cName => form.get(cName))
          .map(cName => (cName == '[self]')?group.valueChanges:form.get(cName).valueChanges);

        //subscribe to changes
        const initialValues = listener.controls
          .map(cName => (cName == '[self]')?group.value:form.get(cName).value);

        const controlChanges$ = Observable.merge(...subs);
        subscriptions.push(
          controlChanges$
            .startWith(...initialValues)
            .subscribe((change: any) => {
              const result = subscriptionFn(change, listener.params, config, group);
              console.log('in sub:::', listener.name);
              sideEffect({name: listener.name, result: result})
            })
        );
      });
    }

    return subscriptions;
  }

  getParentForm(group: any): FormGroup | FormArray {
    let parent = group.parent;
    if (parent !== undefined) {
      return this.getParentForm(parent);
    }
    return group;
  }


}
