import { OpaqueToken } from '@angular/core';

export let CUSTOM_SUBSCRIPTIONS = new OpaqueToken('CUSTOM_SUBSCRIPTIONS');

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {} from "@angular/forms";
import {subscribeIsRendered} from "./isRenderedSubscription";
import {subscribeFilteredOptions} from "./filteredOptionsSubscription";

const EXPORTS = [];

@NgModule({
  imports: [ CommonModule],
  //exports:      [ EXPORTS ],
  //declarations: [ EXPORTS ],
  providers: [
    { provide: CUSTOM_SUBSCRIPTIONS, useValue: subscribeIsRendered, multi: true },
    { provide: CUSTOM_SUBSCRIPTIONS, useValue: subscribeFilteredOptions, multi: true }
  ]
})
export class CustomSubscriptionsModule { }
