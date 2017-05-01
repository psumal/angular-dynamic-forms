import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, NG_VALIDATORS} from "@angular/forms";

import { StartComponent } from "./start.component";

import {} from "../../common/dynamic-form/dynamic-form.module";
import {FormConfigService} from "./form-config.service";
import {FormConfigSelectorModule} from "./form-config-selector/form-config-selector.module";

import {CHANGE_SUBSCRIPTIONS} from "../../common/dynamic-form/customSubscriptions/changeSubscriptions";
import {filteredOptions} from "./customSubscriptions/filteredOptionsSubscription";
import {validateEmail} from "./customValidators/emailValidator";
import {DynamicFormModule} from "../../common/dynamic-form/dynamic-form.module";
import {UiBasicModule} from "../../common/ui-basic/ui-basic.module";
import {UI_COMPONENTS} from "../../common/dynamic-form/components/ui-components.token";
import {SliderComponent} from "./customComponents/slider/slider.component";
import {FormViewerModule} from "./form-viewer/form-viewer.module";
import {FormBuilderModule} from "./form-builder/form-builder.module";
import {controlMatch} from "./customValidators/controlMatchValidator";

export{ StartComponent} from "./start.component";

const EXPORTS = [ StartComponent, SliderComponent ];

@NgModule({
  imports: [ CommonModule,ReactiveFormsModule, FormConfigSelectorModule, DynamicFormModule, UiBasicModule, FormViewerModule, FormBuilderModule],
  exports:      [ EXPORTS ],
  declarations: [ EXPORTS ],
  entryComponents : [SliderComponent],
  providers: [
    FormConfigService,
    { provide: UI_COMPONENTS, useValue: SliderComponent, multi: true },
    { provide: CHANGE_SUBSCRIPTIONS, useValue: filteredOptions, multi: true },
    { provide: NG_VALIDATORS, useValue: validateEmail, multi: true },
    { provide: NG_VALIDATORS, useValue: controlMatch, multi: true }
  ]
})
export class StartModule { }

