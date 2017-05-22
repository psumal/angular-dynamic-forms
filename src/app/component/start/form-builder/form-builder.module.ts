import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilderComponent } from "./form-builder.component";
import {DynamicFormModule} from "../../../common/dynamic-form/dynamic-form.module";

const EXPORTS = [ FormBuilderComponent ];

@NgModule({
  imports: [ CommonModule , FormsModule, DynamicFormModule, ReactiveFormsModule],
  exports:      [ EXPORTS ],
  declarations: [ EXPORTS ],
})
export class FormBuilderModule {

}
