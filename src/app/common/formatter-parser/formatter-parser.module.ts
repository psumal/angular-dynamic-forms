import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {FormatterParserDirective} from "./formatter-parser.directive";
import {FormatterParserService} from "./formatter-parser.service";

const EXPORTS = [FormatterParserDirective];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EXPORTS],
  declarations: [EXPORTS],
  providers: [FormatterParserService]
})
export class FormatterParserModule {}
