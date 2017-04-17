import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ItemButtonModule} from "./button/item.button.module";
import {FormGroupModule} from "./formGroup/form-group.module";
import {ItemControlModule} from "./control/control.module";

const EXPORTS:any = [];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class ItemModule {}
