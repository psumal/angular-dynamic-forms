import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormConfigSelectorComponent } from "./form-config-selector.component";
import {DynamicFormModule} from "../../../common/dynamic-form/dynamic-form.module";

const EXPORTS = [ FormConfigSelectorComponent ];

@NgModule({
  imports: [ CommonModule , FormsModule, DynamicFormModule],
  exports:      [ EXPORTS ],
  declarations: [ EXPORTS ],
})
export class FormConfigSelectorModule {

}
