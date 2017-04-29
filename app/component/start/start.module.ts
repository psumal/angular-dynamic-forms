import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, NG_VALIDATORS} from "@angular/forms";

import { StartComponent } from "./start.component";

import {} from "../../common/dynamic-form/dynamic-form.module";
import {FormConfigService} from "./form-config.service";
import {TemplateFormModule} from "../../common/template-form/template-form.module";


import {CHANGE_SUBSCRIPTIONS} from "../../common/dynamic-form/customSubscriptions/changeSubscriptions";
import {filteredOptions} from "./customSubscriptions/filteredOptionsSubscription";
import {validateEmail} from "./customValidators/emailValidator";
import {DynamicFormModule} from "../../common/dynamic-form/dynamic-form.module";
import {UiBasicModule} from "../../common/ui-basic/ui-basic.module";

export{ StartComponent} from "./start.component";

const EXPORTS = [ StartComponent ];

@NgModule({
  imports: [ CommonModule,ReactiveFormsModule, TemplateFormModule, DynamicFormModule, UiBasicModule],
  exports:      [ EXPORTS ],
  declarations: [ EXPORTS ],
  providers: [
    FormConfigService,
    { provide: CHANGE_SUBSCRIPTIONS, useValue: filteredOptions, multi: true },
    { provide: NG_VALIDATORS, useValue: validateEmail, multi: true }
  ]
})
export class StartModule { }

