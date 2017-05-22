import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormConfigSelectorComponent } from "./form-config-selector.component";
import {DynamicFormModule} from "../../../common/dynamic-form/dynamic-form.module";

const EXPORTS = [ FormConfigSelectorComponent ];

@NgModule({
  imports: [ CommonModule , ReactiveFormsModule, DynamicFormModule],
  exports:      [ EXPORTS ],
  declarations: [ EXPORTS ],
})
export class FormConfigSelectorModule {

}
