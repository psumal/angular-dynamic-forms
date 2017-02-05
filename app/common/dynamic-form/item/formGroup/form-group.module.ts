import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormGroupComponent} from "./item-formGroup.component";

const EXPORTS = [FormGroupComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class FormGroupModule {}
