import {InjectionToken} from "@angular/core";

export interface FormatParseFn {
  (value: any) : any;
}

export class formatParseFunction {

}

export const FORMATTER_PARSER: InjectionToken<(FormatParseFn | formatParseFunction)[]> = new InjectionToken<(FormatParseFn | formatParseFunction)[]>('StateSubscriptions');

