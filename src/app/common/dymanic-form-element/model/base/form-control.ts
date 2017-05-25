import {IValueChangeSubscriptionConfig} from "../../../reactive-utils/value-change-subscription-config";
import {IFormState} from "./objects/form-state";
import {IValidatorConfig} from "../../../validation-utils/validator-config";
import {IFormatterParserConfig} from "../../../formatter-parser/formatter-parser-config";
import {IDynamicFormElementModel} from "./form-control-options";

export class DynamicFormElementModel {

  key: string;
  controlType: string;
  config?: IDynamicFormElementModel[];

  formState?: IFormState | any;
  disabled?: boolean;

  validator?: IValidatorConfig[];
  asyncValidator?: IValidatorConfig[];
  validatorMessages?: {[validationName:string]:string};
  formatterParser?: IFormatterParserConfig[];
  valueChangeSubscriptions?: IValueChangeSubscriptionConfig[];

  label?: string;
  helpText?:string;
  attrs?: {[attr:string]:string}[];
  controlClass?: string[];
  wrapperClass?: string[];

  constructor(options?: IDynamicFormElementModel) {
    options = options || {} as IDynamicFormElementModel;

    this.key = options.key  || null;
    this.controlType = options.controlType || null;
    this.config =  options.config || null;

    this.label = options.label || null;
    this.helpText = options.helpText || null;
    this.attrs = options.attrs || null;
    this.formState = options.formState || null;
    this.disabled = options.disabled || null;

    this.validator = options.validator || [];
    this.asyncValidator = options.asyncValidator || [];
    this.validatorMessages = options.validatorMessages || {};
    this.formatterParser = options.formatterParser || [];
    this.valueChangeSubscriptions = options.valueChangeSubscriptions || [];
    this.controlClass = options.controlClass || [];
    this.wrapperClass = options.wrapperClass || [];

  }

}
