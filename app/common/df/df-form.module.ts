import {NgModule, ANALYZE_FOR_ENTRY_COMPONENTS} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DFFormComp} from "./df-form.component";
import {DFFormGroupComp} from "./df-fg/df-form-group.component";
import {DFFormArrayComp} from "./df-fa/df-form-array.component";
import {DFFormControlComp} from "./df-fc/df-form-control.component";
import {DFDynamicComponentComp} from "./df-dc/df-dynamic-component.component";

const EXPORTS = [DFFormComp, DFFormControlComp, DFFormGroupComp, DFFormArrayComp, DFDynamicComponentComp];

@NgModule({
  imports: [CommonModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class DFModule {
  static withComponents(components: any[]) {
    return {
      ngModule: DFModule,
      providers: [
        {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
      ]
    }
  }
}
