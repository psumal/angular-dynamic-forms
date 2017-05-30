import {IFormatterParserResult} from "../../formatter-parser/struct/formatter-parser-result";
export function toCapitalized(value: string): IFormatterParserResult {

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

}

