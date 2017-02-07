import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecurseComponent} from "./recurse.component";

const EXPORTS = [RecurseComponent];

@NgModule({
  imports: [CommonModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: []
})
export class RecurseModule {}
