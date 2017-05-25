import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';

import {ValueChangeSubscriptionService} from "./value-change-subscription.service";
export {VALUE_CHANGE_SUBSCRIPTIONS} from "./value-change-subscriptions.injectionToken";


const EXPORTS = [];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [ValueChangeSubscriptionService]
})
export class ChangeSubscriptionsModule {}
