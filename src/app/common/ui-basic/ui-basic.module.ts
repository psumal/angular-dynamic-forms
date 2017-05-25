import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import {ButtonComponent} from "./button/button.component";
import {ControlComponent} from "./control/control.component";
import {FormGroupComponent} from "./formGroup/item-formGroup.component";
import {ContainerComponent} from "./container/container.component";

import {FormatterParserModule} from "../formatter-parser/formatter-parser.module";
import {ValidationUtilsModule} from "../validation-utils/validation-utils.module";
import {ChangeSubscriptionsModule} from "../reactive-utils/value-change-subscriptions.module";
import {DynamicFormElementModule} from "../dymanic-form-element/dynamic-form-element.module";
import {UI_COMPONENTS} from "../dymanic-form-element/dynamic-form-element.injectonToken";

const ENTRY_COMPONENTS = [ ControlComponent, ButtonComponent, FormGroupComponent, ContainerComponent ];
const EXPORTS = [ ...ENTRY_COMPONENTS  ];

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, DynamicFormElementModule, FormatterParserModule, ValidationUtilsModule, ChangeSubscriptionsModule],
  exports:      [ EXPORTS],
  declarations: [ EXPORTS],
  entryComponents: [
    ENTRY_COMPONENTS
  ],
  providers : [
    { provide: UI_COMPONENTS, useValue: ButtonComponent, multi: true },
    { provide: UI_COMPONENTS, useValue: ControlComponent, multi: true },
    { provide: UI_COMPONENTS, useValue: FormGroupComponent, multi: true },
    { provide: UI_COMPONENTS, useValue: ContainerComponent, multi:true}
  ]
})
export class UiBasicModule {}
