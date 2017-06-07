import { IFormatterParserFn } from '../../formatter-parser/struct/formatter-parser-function';
import { IFormatterParserResult } from '../../formatter-parser/struct/formatter-parser-result';

export function replaceString(searchValue: RegExp, replaceValue: string): IFormatterParserFn {

  return (value: any) => {

    const result: IFormatterParserResult = {
      name: 'replaceString',
      result: value
    };

    if (typeof value === 'string' || value instanceof String) {
      result.result = value.replace(searchValue, replaceValue)
    }
    return result;
  }

}
