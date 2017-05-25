import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

import {StartComponent} from "./start.component";
import {UiBasicModule} from "../../common/ui-basic/ui-basic.module";
import {DynamicFormElementModule} from "../../common/dymanic-form-element/dynamic-form-element.module";

import {FormConfigSelectorModule} from "./form-config-selector/form-config-selector.module";
import {FormViewerModule} from "./form-viewer/form-viewer.module";
import {FormBuilderModule} from "./form-builder/form-builder.module";

const EXPORTS = [
  StartComponent
];

@NgModule({
  imports: [
    CommonModule,

    FormConfigSelectorModule,
    //FormViewerModule,
    //FormBuilderModule
  ],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  entryComponents: [],
  providers: []
})
export class StartModule {
}

