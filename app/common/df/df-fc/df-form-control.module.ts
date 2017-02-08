import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DFFormControlComp} from "./df-form-control.component";


const EXPORTS = [DFFormControlComp];

@NgModule({
  imports: [CommonModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class DFFCModule {
}
