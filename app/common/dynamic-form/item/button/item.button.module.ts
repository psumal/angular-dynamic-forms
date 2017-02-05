import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from "./button.component";
import {ButtonItem} from "./item-button";

export {ButtonItem} from "./item-button"

const EXPORTS = [ButtonComponent];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class ItemButtonModule {}
