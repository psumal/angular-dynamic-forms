import {IValueChangeSubscriptionConfig} from "../../../value-change-subscriptions/value-change-subscription-config";
import {ISelectOption} from "./objects/select-option";
import {IFormState} from "./objects/form-state";
import {IValidatorConfig} from "../../../validation-utils/validator-config";
import {IFormatterParserConfig} from "../../../formatter-parser/struct/formatter-parser-config";

export interface IDynamicFormElementModel {
  key?: string;
  controlType?: string;
  config?: IDynamicFormElementModel[];
  numOfRows?:number;
  inputType?: string;

  placeholder?: string;

  options?: ISelectOption[];
  noOptKey?: string;
  multiple?: boolean;

  formState?: IFormState | any;
  disabled?: boolean;

  validator?: IValidatorConfig[];
  asyncValidator?: IValidatorConfig[];
  validatorMessages?: { [validationName: string]: string };
  formatterParser?: IFormatterParserConfig[];
  valueChangeSubscriptions?: IValueChangeSubscriptionConfig[];

  label?: string;
  helpText?: string;
  attrs?: { [attr: string]: string }[];
  controlClass?: string[];
  wrapperClass?: string[];
}
