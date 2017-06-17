import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NG_ASYNC_VALIDATORS, NG_VALIDATORS, ReactiveFormsModule} from "@angular/forms";
import {VALUE_CHANGE_SUBSCRIPTIONS} from "../value-change-subscriptions/value-change-subscriptions.injectionToken";
import {UI_COMPONENTS} from "../dymanic-form-element/dynamic-form-element.injectonToken";
import {FORMATTER_PARSER} from "../formatter-parser/formatter-parser.injectionToken";
import {randomValidator} from "./validators/randomlValidator";
import {dividableBy} from "./validators/dividableByValidator";
import {promiseValidator} from "./async-validators/promiseValidator";
import {observableValidator} from "./async-validators/observableValidator";
import {controlMatch} from "./validators/controlMatchValidator";
import {maskString} from "./formatter-parser/maskString";
import {replaceString} from "./formatter-parser/replaceString";
import {someOf} from "./validators/someOfValidator";
import {SliderComponent} from "./components/slider/slider.component";
import {GoogleAddressSearchComponent} from "./components/google-address-search/google-address-search.component";
import {filteredOptions} from "./change-subscriptions/filteredOptionsSubscription";
import {AgmCoreModule} from "@agm/core";
import {syncWithAddressComponent} from "./change-subscriptions/syncWithAddressComponent";
import {focusFirstEmpty} from "./change-subscriptions/focusFirstEmpty";
import { ibanMask } from './payment/sepa/formatter-parser/iban-mask';
import { CustomRadioComponent } from './components/custom-radio/custom-radio.component';


const EXPORTS = [SliderComponent, GoogleAddressSearchComponent, CustomRadioComponent];

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCfHTTcmCwTe3rFnt6eYeV9gALdoZvGfZQ',
      libraries: ['places']
    }),
    CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  entryComponents: [
    EXPORTS
  ],
  providers: [
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
    {provide: FORMATTER_PARSER, useValue: maskString, multi: true},
    {provide: FORMATTER_PARSER, useValue: replaceString, multi: true},
    //Payment
    {provide: FORMATTER_PARSER, useValue: ibanMask, multi: true},

    //Custom Components
    {provide: UI_COMPONENTS, useValue: SliderComponent, multi: true},
    {provide: UI_COMPONENTS, useValue: GoogleAddressSearchComponent, multi: true},
    {provide: UI_COMPONENTS, useValue: CustomRadioComponent, multi: true},

    //Custom Value Change Subscriptions
    {provide: VALUE_CHANGE_SUBSCRIPTIONS, useValue: filteredOptions, multi: true},
    {provide: VALUE_CHANGE_SUBSCRIPTIONS, useValue: syncWithAddressComponent, multi: true},
    {provide: VALUE_CHANGE_SUBSCRIPTIONS, useValue: focusFirstEmpty, multi: true},

  ]
})
export class DynamicFormElementAddonModule {

}
