import {IFormatterParserFn} from "./struct/formatter-parser-function";
import {IFormatterParserResult} from "./struct/formatter-parser-result";
import {IConformToMaskConfigOptions, IConformToMaskResult} from "./text-mask-core/conformToMask/conformToMask-struckt";
import {conformToMask as realConformToMask} from "./text-mask-core/conformToMask/conformToMask";


export class FormatterParser {

  static charsInLowerAndUppercase = 'a-zA-Zäéöüßàâæçèéêëîïôœùûàáèéìíòóùúčšéć';

  static toCapitalized: IFormatterParserFn = (value: any): IFormatterParserResult => {

    if (value && (typeof value === "string" || "toString" in value)) {
      value = value.toString().toLowerCase().replace(/[^a-zA-Zäéöüßàâæçèéêëîïôœùûàáèéìíòóùúčšéć]./g, function (str) {
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
    if (value && (typeof value === "string" || "toString" in value)) {
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

  static conformToMask(mask: string | (RegExp | string)[] | Function = '', config: IConformToMaskConfigOptions = {}): IFormatterParserFn {

    return (value: any):IFormatterParserResult => {
      value = value || '';
      const realResult: IConformToMaskResult = realConformToMask(value, mask, config);
      return {
        name: "conformToMask",
        result: realResult.conformedValue,
        conformToMaskResult: realResult
      };
    }

  }

  /*Dummy placeholder for textMask exception*/
  static textMask() {

  }

}

