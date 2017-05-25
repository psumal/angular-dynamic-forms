import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {FormBuilderComponent} from "./form-builder.component";
import {DynamicFormElementModule} from "../../../modules/dymanic-form-element/dynamic-form-element.module";
import {UiBasicModule} from "../../../modules/ui-basic/ui-basic.module";
import {DynamicFormElementAddonModule} from "../../../modules/dynamic-form-addons/dynamic-form-addons.module";

const EXPORTS = [FormBuilderComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule,
    DynamicFormElementModule,
    UiBasicModule,
    DynamicFormElementAddonModule,
  ],
  exports: [EXPORTS],
  declarations: [EXPORTS],
})
export class FormBuilderModule {

}
