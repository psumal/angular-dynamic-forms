import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {DynamicFormComponent} from "./containers/dynamic-form.component";
import {DynamicItemDirective} from "./components/dynamic-item/dynamic-item.directive";
import {ErrorService} from "./services/error.service";
import {InteractionHandlerDirective} from "./components/interaction-handler/interaction-handler.directive";
import {FormatterParserDirective} from "./components/formatter-parser/formatter-parser.directive";

export{DynamicFormComponent} from "./containers/dynamic-form.component";

const EXPORTS = [DynamicFormComponent, DynamicItemDirective, InteractionHandlerDirective, FormatterParserDirective];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [ErrorService]
})
export class DynamicFormModule {}
