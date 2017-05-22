import {InjectionToken} from "@angular/core";

export interface FormatParseFn {
  (value: any) : any;
}

export const FORMATTER_PARSER: InjectionToken<(FormatParseFn)[]> = new InjectionToken<(FormatParseFn)[]>('formatterParser');

