import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UI_COMPONENTS} from "../dynamic-form/components/ui-components.token";
import {ButtonComponent} from "./button/button.component";
import {ControlComponent} from "./control/control.component";
import {FormGroupComponent} from "./formGroup/item-formGroup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicFGItemDirective} from "./formGroup/dynamicFormGroupItem/dynamic-form-group-item.directive";

const EXPORTS = [ ControlComponent, ButtonComponent, FormGroupComponent  ];

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule],
  exports:      [ EXPORTS, DynamicFGItemDirective ],
  declarations: [ EXPORTS , DynamicFGItemDirective],
  entryComponents: [
    EXPORTS
  ],
  providers : [
    { provide: UI_COMPONENTS, useValue: ButtonComponent, multi: true },
    { provide: UI_COMPONENTS, useValue: ControlComponent, multi: true },
    { provide: UI_COMPONENTS, useValue: FormGroupComponent, multi: true }
  ]
})
export class UiBasicModule {}
