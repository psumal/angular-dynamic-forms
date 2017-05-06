import {FormatParseFn} from "../../../../common/dynamic-form/injects/formatterParser";

export function replaceString(searchValue: RegExp, replaceValue: string): FormatParseFn {

  return (value: any) => {
    let replacedValue = value.replace(searchValue, replaceValue);
    console.log('replace ', value, ' to ', replacedValue);
    return replacedValue;
  }

}
