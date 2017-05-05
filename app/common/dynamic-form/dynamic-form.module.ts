import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {DynamicFormComponent} from "./containers/dynamic-form.component";
import {DynamicItemDirective} from "./components/dynamic-item/dynamic-item.directive";
import {ErrorService} from "./services/error.service";
import {AttrSetterDirective} from "./components/attr-setter.directive/attr-setter.directive";
import {InteractionHandlerDirective} from "./components/interaction-handler/interaction-handler.directive";

export{DynamicFormComponent} from "./containers/dynamic-form.component";

const EXPORTS = [DynamicFormComponent, DynamicItemDirective, AttrSetterDirective, InteractionHandlerDirective];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [ErrorService]
})
export class DynamicFormModule {}
