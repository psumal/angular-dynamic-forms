import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {ValidationService} from "./validation.service";
import {ControlErrorComponent} from "./errors/errors.component";
import {ErrorService} from "./errors/error.service";


const EXPORTS = [ControlErrorComponent];

@NgModule({
  imports: [CommonModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [ValidationService, ErrorService]
})
export class ValidationUtilsModule {
}
