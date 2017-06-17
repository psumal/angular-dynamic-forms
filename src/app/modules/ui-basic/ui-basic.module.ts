import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from './button/button.component';
import { ControlComponent } from './control/control.component';
import { FormGroupComponent } from './formGroup/item-formGroup.component';
import { ContainerComponent } from './container/container.component';

import { FormatterParserModule } from '../formatter-parser/formatter-parser.module';
import { ValidationUtilsModule } from '../validation-utils/validation-utils.module';
import { ChangeSubscriptionsModule } from '../value-change-subscriptions/value-change-subscriptions.module';
import { DynamicFormElementModule } from '../dymanic-form-element/dynamic-form-element.module';
import { UI_COMPONENTS } from '../dymanic-form-element/dynamic-form-element.injectonToken';
import { TextboxComponent } from './textbox/textbox.component';
import { TextareaComponent } from './textarea/textarea.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { FormArrayComponent } from './formArray/item-formArray.component';

const ENTRY_COMPONENTS = [
  ContainerComponent,
  ControlComponent,
  TextboxComponent,
  TextareaComponent,
  CheckboxComponent,
  RadioComponent,
  SelectComponent,
  ButtonComponent,
  FormGroupComponent,
  FormArrayComponent
];
const EXPORTS = [...ENTRY_COMPONENTS];

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule,
    DynamicFormElementModule,
    FormatterParserModule.forRoot(),
    ValidationUtilsModule,
    ChangeSubscriptionsModule
  ],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  entryComponents: [
    ENTRY_COMPONENTS
  ],
  providers: [
    {provide: UI_COMPONENTS, useValue: ContainerComponent, multi: true},

    // {provide: UI_COMPONENTS, useValue: ControlComponent, multi: true},
    {provide: UI_COMPONENTS, useValue: TextboxComponent, multi: true},
    {provide: UI_COMPONENTS, useValue: TextareaComponent, multi: true},
    {provide: UI_COMPONENTS, useValue: CheckboxComponent, multi: true},
    {provide: UI_COMPONENTS, useValue: RadioComponent, multi: true},
    {provide: UI_COMPONENTS, useValue: SelectComponent, multi: true},

    {provide: UI_COMPONENTS, useValue: ButtonComponent, multi: true},

    {provide: UI_COMPONENTS, useValue: FormGroupComponent, multi: true},
    {provide: UI_COMPONENTS, useValue: FormArrayComponent, multi: true},
  ]
})
export class UiBasicModule {
}
