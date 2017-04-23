import {NgModule, InjectionToken} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {DynamicFormComponent} from "./containers/dynamic-form.component";

import {ControlComponent} from './components/control/control.component';
import {FormGroupComponent} from "./components/formGroup/item-formGroup.component";
import {ButtonComponent} from "./components/button/button.component";
import {ControlErrorComponent} from "./components/errors/errors.component";

export{DynamicFormComponent} from "./containers/dynamic-form.component";

const EXPORTS = [DynamicFormComponent, FormGroupComponent, ControlComponent, ButtonComponent, FormGroupComponent, ControlErrorComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class DynamicFormModule {
  static withComponents(components: any[]) {
    return {
      ngModule: DynamicFormModule
    }
  }
}
