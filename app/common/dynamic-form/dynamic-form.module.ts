import {NgModule, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DynamicFormComponent} from "./dynamic-form.component";
import {ControlComponent} from './item/control/control.component';
import {ErrorsModule} from "./item/errors/errors.module";
import {ItemButtonModule} from "./item/button/item.button.module";
import {FormGroupComponent} from "./item/formGroup/item-formGroup.component";
import {ItemModule} from "./item/item.module";

export{DynamicFormComponent} from "./dynamic-form.component";

const EXPORTS = [DynamicFormComponent, FormGroupComponent, ControlComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ErrorsModule, ItemButtonModule, ItemModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class DynamicFormModule {
  static withComponents(components: any[]) {
    return {
      ngModule: DynamicFormModule,
      providers: [
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
      ]
    }
  }
}
