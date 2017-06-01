import {InjectionToken} from "@angular/core";
import {StateSubscriptions} from "./stateSubscriptions";

export const STATE_SUBSCRIPTIONS: InjectionToken<(Function | StateSubscriptions)[]> = new InjectionToken<(Function | StateSubscriptions)[]>('StateSubscriptions');

