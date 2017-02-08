import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DFFormComp} from "./df-form.component";
import {DFFGModule} from "./df-fg/df-form-group.module";

export {DFFGModule} from "./df-fg/df-form-group.module";


const EXPORTS = [DFFormComp];

@NgModule({
  imports: [CommonModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class DFModule {}
