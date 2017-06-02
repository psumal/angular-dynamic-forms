import {NgModule} from "@angular/core";

import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {FormatterParserTextMaskDirective} from "./formatter-parser-text-mask.directive";
import {FormatterParserService} from "./formatter-parser.service";

const EXPORTS = [FormatterParserTextMaskDirective];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [FormatterParserService]
})
export class FormatterParserModule {
}
