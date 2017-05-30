import {IFormatterParserFn} from "./struct/formatter-parser-function";
import {IFormatterParserResult} from "./struct/formatter-parser-result";
export class FormatterParser {

  static charsInLowerAndUppercase = 'a-zA-Zäéöüßàâæçèéêëîïôœùûàáèéìíòóùúčšéć';

  static toCapitalized: IFormatterParserFn = (value: string): IFormatterParserResult => {

    if (typeof value === "string") {
      value = value.toLowerCase().replace(/[^a-zA-Zäéöüßàâæçèéêëîïôœùûàáèéìíòóùúčšéć]./g, function (str) {
        return str.toUpperCase();
      });
    }
    else {
      value = "";
    }

    return {
      name: "toCapitalized",
      result: value.charAt(0).toUpperCase() + value.slice(1)
    }

  };

  static toUpperCase: IFormatterParserFn = (value: any): IFormatterParserResult => {

    let transformedValue;
    if (typeof value === "string" || "toString" in value) {
      transformedValue = value.toString().toLowerCase().replace(/[a-zA-Zäéöüßàâæçèéêëîïôœùûàáèéìíòóùúčšéć]/g, function (str) {
        return str.toUpperCase();
      });
    }
    else {
      transformedValue = "";
    }

    return {
      name: "toUpperCase",
      result: transformedValue
    };
  };

}

