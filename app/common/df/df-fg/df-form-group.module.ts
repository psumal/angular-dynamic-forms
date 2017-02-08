import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DFFormGroupComp} from "./df-form-group.component";


const EXPORTS = [DFFormGroupComp];

@NgModule({
  imports: [CommonModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class DFFGModule {
}
