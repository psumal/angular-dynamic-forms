import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, NG_VALIDATORS, NG_ASYNC_VALIDATORS} from "@angular/forms";
import {StartComponent} from "./start.component";
import {FormConfigService} from "./form-config.service";
import {FormConfigSelectorModule} from "./form-config-selector/form-config-selector.module";
import {filteredOptions} from "./custom-form-stuff/change-subscriptions/filteredOptionsSubscription";
import {DynamicFormModule} from "../../common/dynamic-form/dynamic-form.module";
import {UiBasicModule} from "../../common/ui-basic/ui-basic.module";
import {SliderComponent} from "./custom-form-stuff/components/slider/slider.component";
import {FormViewerModule} from "./form-viewer/form-viewer.module";
import {FormBuilderModule} from "./form-builder/form-builder.module";
import {controlMatch} from "./custom-form-stuff/validators/controlMatchValidator";
import {dividableBy} from "./custom-form-stuff/validators/dividableByValidator";
import {promiseValidator} from "./custom-form-stuff/validators/promiseValidator";
import {observableValidator} from "./custom-form-stuff/validators/observableValidator";
import {randomValidator} from "./custom-form-stuff/validators/randomlValidator";
import {someOf} from "./custom-form-stuff/validators/someOfValidator";
import {ErrorServiceConfig} from "../../common/dynamic-form/services/errorConfig.service";
import {maskString} from "./custom-form-stuff/formatter-parser/maskString";
import {replaceString} from "./custom-form-stuff/formatter-parser/replaceString";
import {toCapitalized} from "./custom-form-stuff/formatter-parser/toCapitalized";
import {GoogleAddressSearchComponent} from "./custom-form-stuff/components/google-address-search/google-address-search.component";
import {AgmCoreModule, } from "@agm/core";
import {FORMATTER_PARSER} from "../../common/dynamic-form/injects/formatterParser";
import {CHANGE_SUBSCRIPTIONS} from "../../common/dynamic-form/injects/changeSubscriptions";
import {UI_COMPONENTS} from "../../common/dynamic-form/components/ui-components.token";

const EXPORTS = [StartComponent, SliderComponent, GoogleAddressSearchComponent];

const CUSTOM_DEFAULT_ERRORMAP:ErrorServiceConfig = {
  DEFAULT_ERROR:"This value is overridden globally by the ErrorConfigService"
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormConfigSelectorModule,
    DynamicFormModule,
    UiBasicModule,
    FormViewerModule,
    FormBuilderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCfHTTcmCwTe3rFnt6eYeV9gALdoZvGfZQ',
      libraries:['places']
    })
  ],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  entryComponents: [
    SliderComponent,
    GoogleAddressSearchComponent
  ],
  providers: [
    FormConfigService,
    //VALIDATORS Control
    //customValidator for control
    {provide: NG_VALIDATORS, useValue: randomValidator, multi: true},
    //customValidator for control with params
    {provide: NG_VALIDATORS, useValue: dividableBy, multi: true},

    //ASYNC_VALIDATORS Control
    //customAsyncValidator for control
    {provide: NG_ASYNC_VALIDATORS, useValue: promiseValidator, multi: true},
    {provide: NG_ASYNC_VALIDATORS, useValue: observableValidator, multi: true},
    //customValidator for control with params
    //@TODO

    //VALIDATORS Group
    {provide: NG_VALIDATORS, useValue: controlMatch, multi: true},
    {provide: NG_VALIDATORS, useValue: someOf, multi: true},
    //customValidator for group with params
    //@TODO

    //ASYNC_VALIDATORS Group
    //{provide: NG_VALIDATORS, useValue: ??????, multi: true}
    //customValidator for group with params
    //@TODO

    //Custom Formatter and Parser
    {provide: FORMATTER_PARSER, useValue: toCapitalized, multi: true},
    {provide: FORMATTER_PARSER, useValue: maskString, multi: true},
    {provide: FORMATTER_PARSER, useValue: replaceString, multi: true},

    //Custom Components
    {provide: UI_COMPONENTS, useValue: SliderComponent, multi: true},
    {provide: UI_COMPONENTS, useValue: GoogleAddressSearchComponent, multi: true},

    //Custom Value Change Subscriptions
    {provide: CHANGE_SUBSCRIPTIONS, useValue: filteredOptions, multi: true},

  ]
})
export class StartModule {
}

