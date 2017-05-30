import {IFormatterParserResult} from "../../formatter-parser/struct/formatter-parser-result";
export function toUppercase(value: string): IFormatterParserResult {

  if (typeof value === "string") {
    value = value.toLowerCase().replace(/[a-zA-Zäéöüßàâæçèéêëîïôœùûàáèéìíòóùúčšéć]/g, function (str) {
      return str.toUpperCase();
    });
  }
  else {
    value = "";
  }

  return {
    name: "toUppercase",
    result: value
  }

}

