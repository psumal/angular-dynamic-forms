import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import {subscribeIsRendered} from "./isRenderedSubscription";
import {subscribeFilteredOptions} from "./filteredOptionsSubscription";

export const CUSTOM_SUBSCRIPTIONS: InjectionToken<(Function)[]> = new InjectionToken<(Function)[]>('CustomSubscriptions');

@NgModule({
  imports: [ CommonModule],
  providers: [
    { provide: CUSTOM_SUBSCRIPTIONS, useValue: subscribeIsRendered, multi: true },
    { provide: CUSTOM_SUBSCRIPTIONS, useValue: subscribeFilteredOptions, multi: true }
  ]
})
export class CustomSubscriptionsModule { }
