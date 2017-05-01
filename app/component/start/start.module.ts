import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, NG_VALIDATORS, NG_ASYNC_VALIDATORS} from "@angular/forms";
import {StartComponent} from "./start.component";
import {FormConfigService} from "./form-config.service";
import {FormConfigSelectorModule} from "./form-config-selector/form-config-selector.module";
import {CHANGE_SUBSCRIPTIONS} from "../../common/dynamic-form/customSubscriptions/changeSubscriptions";
import {UI_COMPONENTS} from "../../common/dynamic-form/components/ui-components.token";
import {filteredOptions} from "./customSubscriptions/filteredOptionsSubscription";
import {DynamicFormModule} from "../../common/dynamic-form/dynamic-form.module";
import {UiBasicModule} from "../../common/ui-basic/ui-basic.module";
import {SliderComponent} from "./customComponents/slider/slider.component";
import {FormViewerModule} from "./form-viewer/form-viewer.module";
import {FormBuilderModule} from "./form-builder/form-builder.module";
import {controlMatch} from "./customValidators/controlMatchValidator";
import {dividableBy} from "./customValidators/dividableByValidator";
import {promiseValidator} from "./customValidators/promiseValidator";
import {observableValidator} from "./customValidators/observableValidator";
import {randomValidator} from "./customValidators/randomlValidator";

export{StartComponent} from "./start.component";

const EXPORTS = [StartComponent, SliderComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormConfigSelectorModule, DynamicFormModule, UiBasicModule, FormViewerModule, FormBuilderModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  entryComponents: [SliderComponent],
  providers: [
    FormConfigService,
    {provide: UI_COMPONENTS, useValue: SliderComponent, multi: true},
    {provide: CHANGE_SUBSCRIPTIONS, useValue: filteredOptions, multi: true},
    //VALIDATORS
    //customValidator for control
    {provide: NG_VALIDATORS, useValue: randomValidator, multi: true},
    //customValidator for control with params
    {provide: NG_VALIDATORS, useValue: dividableBy, multi: true},
    //ASYNC_VALIDATORS
    //customAsyncValidator for control
    //{provide: NG_ASYNC_VALIDATORS, useValue: promiseValidator, multi: true},
    //{provide: NG_VALIDATORS, useValue: observableValidator, multi: true},
    //customValidator for group
    //{provide: NG_VALIDATORS, useValue: controlMatch, multi: true}
    //customValidator for group with params
    //@TODO

  ]
})
export class StartModule {
}

