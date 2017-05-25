import {FormatParseFn} from "../../formatter-parser/formatter-parser-function";

export function replaceString(searchValue: RegExp, replaceValue: string): FormatParseFn {

  return (value: any) => {
    let replacedValue = value.replace(searchValue, replaceValue);
    return replacedValue;
  }

}
