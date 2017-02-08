import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestComponent} from "./test.component";

import {DFModule} from "../../common/df/df-form.module";
import {DFFGModule} from "../../common/df/df-fg/df-form-group.module";
import {DFFCModule} from "../../common/df/df-fc/df-form-control.module";
import {DFFAModule} from "../../common/df/df-fa/df-form-array.module";


const EXPORTS = [TestComponent];

@NgModule({
  imports: [CommonModule, DFModule, DFFGModule, DFFCModule, DFFAModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class TestModule {

}
