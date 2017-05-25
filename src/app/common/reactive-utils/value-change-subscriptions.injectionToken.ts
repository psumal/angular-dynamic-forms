import {InjectionToken} from "@angular/core";
import {ValueChangeSubscriptions} from "./valueChangeSubscriptions";
import {ValueChangeSubscriptionFn} from "./value-change-subscriptions-function";

export const VALUE_CHANGE_SUBSCRIPTIONS: InjectionToken<(ValueChangeSubscriptionFn | ValueChangeSubscriptions)[]> = new InjectionToken<(ValueChangeSubscriptionFn | ValueChangeSubscriptions)[]>('CustomSubscriptions');

