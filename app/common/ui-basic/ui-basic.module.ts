import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UI_COMPONENTS} from "../dynamic-form/components/ui-components.token";
import {ButtonComponent} from "./button/button.component";
import {ControlComponent} from "./control/control.component";
import {FormGroupComponent} from "./formGroup/item-formGroup.component";
import {ControlErrorComponent} from "./errors/errors.component";
import {ReactiveFormsModule} from "@angular/forms";

const EXPORTS = [ ControlComponent, ButtonComponent, ControlErrorComponent, FormGroupComponent ];

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule],
  exports:      [ EXPORTS ],
  declarations: [ EXPORTS ],
  entryComponents: [
    EXPORTS
  ],
  providers : [
    { provide: UI_COMPONENTS, useValue: ButtonComponent, multi: true },
    { provide: UI_COMPONENTS, useValue: ControlComponent, multi: true },
    { provide: UI_COMPONENTS, useValue: FormGroupComponent, multi: true },
    { provide: UI_COMPONENTS, useValue: ControlErrorComponent, multi: true }
  ]
})
export class UiBasicModule {}
