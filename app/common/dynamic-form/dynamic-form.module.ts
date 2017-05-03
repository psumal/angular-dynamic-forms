import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {DynamicFormComponent} from "./containers/dynamic-form.component";
import {DynamicItemDirective} from "./components/dynamicItem/dynamic-item.directive";
import {ErrorService} from "./services/error.service";

export{DynamicFormComponent} from "./containers/dynamic-form.component";

const EXPORTS = [DynamicFormComponent, DynamicItemDirective];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [ErrorService]
})
export class DynamicFormModule {}
