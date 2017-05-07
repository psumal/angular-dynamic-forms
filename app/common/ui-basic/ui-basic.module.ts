import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UI_COMPONENTS} from "../dynamic-form/components/ui-components.token";
import {ButtonComponent} from "./button/button.component";
import {ControlComponent} from "./control/control.component";
import {FormGroupComponent} from "./formGroup/item-formGroup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ControlErrorComponent} from "./errors/errors.component";
import {DynamicFormModule} from "../dynamic-form/dynamic-form.module";
import {RowComponent} from "./row/row.component";

const ENTRY_COMPONENTS = [ ControlComponent, ButtonComponent, FormGroupComponent, ControlErrorComponent, RowComponent  ];
const EXPORTS = [ ...ENTRY_COMPONENTS  ];

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, DynamicFormModule],
  exports:      [ EXPORTS],
  declarations: [ EXPORTS],
  entryComponents: [
    ENTRY_COMPONENTS
  ],
  providers : [
    { provide: UI_COMPONENTS, useValue: ButtonComponent, multi: true },
    { provide: UI_COMPONENTS, useValue: ControlComponent, multi: true },
    { provide: UI_COMPONENTS, useValue: FormGroupComponent, multi: true },
    { provide: UI_COMPONENTS, useValue: RowComponent, multi:true}
  ]
})
export class UiBasicModule {}
