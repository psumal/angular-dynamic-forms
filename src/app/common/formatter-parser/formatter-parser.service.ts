import {FORMATTER_PARSER} from "./formatter-parser.injectionToken";
import {Inject, Injectable, Optional} from "@angular/core";
import {FormatParseFn} from "./formatter-parser-function";

@Injectable()
export class FormatterParserService {

  constructor(@Optional() @Inject(FORMATTER_PARSER) private FORMATTER_PARSER: FormatParseFn[]) {
  }

  getFormatParseFunction(functionName: string, params: any[]): FormatParseFn | undefined {
    let formatParseFunction: Function;

    if (this.FORMATTER_PARSER) {
      formatParseFunction = this.FORMATTER_PARSER.find(formParsFunc => {
        return functionName === formParsFunc.name;
      });
    } else {
      throw new Error(`No function provided via FORMATTER_PARSER. Did you forgot to provide them?`);
    }

    if (!(typeof formatParseFunction === "function")) {
      throw new Error(`Formatter or Parser with name ${functionName} is not provided via FORMATTER_PARSER.`);
    }

    return (params) ? formatParseFunction(...params) : formatParseFunction;
  }

}
