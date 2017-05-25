import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {FormConfigSelectorComponent} from "./form-config-selector.component";
import {FormConfigService} from "./form-config.service";
import {DynamicFormElementModule} from "../../../modules/dymanic-form-element/dynamic-form-element.module";
import {UiBasicModule} from "../../../modules/ui-basic/ui-basic.module";
import {DynamicFormElementAddonModule} from "../../../modules/dynamic-form-addons/dynamic-form-addons.module";

const EXPORTS = [FormConfigSelectorComponent];

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule,
    DynamicFormElementModule,
    UiBasicModule,
    DynamicFormElementAddonModule
  ],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [
    FormConfigService
  ]
})
export class FormConfigSelectorModule {

}
