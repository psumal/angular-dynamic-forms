import {IFormatterParserFn} from "../../formatter-parser/struct/formatter-parser-function";

export function replaceString(searchValue: RegExp, replaceValue: string): IFormatterParserFn {

  return (value: any) => {
    let replacedValue = value.replace(searchValue, replaceValue);
    return {
      name: "replaceString",
      result: replacedValue
    };
  }

}
