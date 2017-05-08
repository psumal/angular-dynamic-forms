import {FormatParseFn} from "../../../../common/dynamic-form/injects/formatterParser";

export function replaceString(searchValue: RegExp, replaceValue: string): FormatParseFn {

  return (value: any) => {
    let replacedValue = value.replace(searchValue, replaceValue);
    return replacedValue;
  }

}
