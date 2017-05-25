import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {StartComponent} from "./start.component";

import {FormConfigSelectorModule} from "./form-config-selector/form-config-selector.module";

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

