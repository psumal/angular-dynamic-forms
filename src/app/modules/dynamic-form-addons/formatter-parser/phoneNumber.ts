// https://rawgit.com/googlei18n/libphonenumber/master/javascript/i18n/phonenumbers/demo-compiled.html
// https://github.com/googlei18n/libphonenumber


import { IFormatterParserFn } from '../../formatter-parser/struct/formatter-parser-function';
export function phoneNumber(config): IFormatterParserFn {

  return (value: any) => {
    value = (typeof value === 'string' || value instanceof String) ? value : '';
    return {
      name: "phoneNumber",
      result: value
    };
  }

}

