import {InjectionToken} from "@angular/core";
import {FormatParseFn} from "./formatter-parser-function";

export const FORMATTER_PARSER: InjectionToken<(FormatParseFn)[]> = new InjectionToken<(FormatParseFn)[]>('formatterParser');

