import {NgModule, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DynamicFormComponent} from "./dynamic-form.component";
import {ItemComponent} from './item/control/item.component';
import {ErrorsModule} from "./errors/errors.module";
import {ItemButtonModule} from "./item/button/item.button.module";
import {FormGroupComponent} from "./item/formGroup/item-formGroup.component";
import {ItemModule} from "./item/item.module";
import {DynamicFormDynamicComponentComp} from "./df-dynamic-component/df-dynamic-component.component";

export{DynamicFormComponent} from "./dynamic-form.component";

const EXPORTS = [DynamicFormComponent, FormGroupComponent, ItemComponent, DynamicFormDynamicComponentComp];

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
