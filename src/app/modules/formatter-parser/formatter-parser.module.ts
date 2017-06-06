import {NgModule} from "@angular/core";

import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {FormatterParserTextMaskDirective} from "./formatter-parser-text-mask.directive";
import {FormatterParserService} from "./formatter-parser.service";
import { TextMaskService } from './text-mask-helpers/textMask.service';

const EXPORTS = [FormatterParserTextMaskDirective];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [FormatterParserService, TextMaskService]
})
export class FormatterParserModule {
}
