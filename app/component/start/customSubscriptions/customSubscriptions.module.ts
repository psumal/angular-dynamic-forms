import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CHANGE_SUBSCRIPTIONS} from "../../../common/dynamic-form/customSubscriptions/customSubscriptions.module";
import {filteredOptions} from "./filteredOptionsSubscription";


@NgModule({
  imports: [ CommonModule],
  providers: [
    { provide: CHANGE_SUBSCRIPTIONS, useValue: filteredOptions, multi: true }
  ]
})
export class CustomCangeSubscriptionsModule { }
