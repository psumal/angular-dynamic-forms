import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormViewerComponent } from "./form-viewer.component";
import {DynamicFormModule} from "../../../common/dynamic-form/dynamic-form.module";

const EXPORTS = [ FormViewerComponent ];

@NgModule({
  imports: [ CommonModule , FormsModule, DynamicFormModule, ReactiveFormsModule],
  exports:      [ EXPORTS ],
  declarations: [ EXPORTS ],
})
export class FormViewerModule {

}
