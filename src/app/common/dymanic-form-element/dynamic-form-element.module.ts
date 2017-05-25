import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {DynamicFormElementService} from "./dynamic-form-element.service";
import {DynamicFormElementComponent} from "./dynamic-form-element.component";
import {DynamicFormElementDirective} from "./dynamic-form-element.directive";

const EXPORTS = [DynamicFormElementComponent, DynamicFormElementDirective];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [DynamicFormElementService]
})
export class DynamicFormElementModule {}
