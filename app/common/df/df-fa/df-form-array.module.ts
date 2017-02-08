import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DFFormArrayComp} from "./df-form-array.component";


const EXPORTS = [DFFormArrayComp];

@NgModule({
  imports: [CommonModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class DFFAModule {
}
