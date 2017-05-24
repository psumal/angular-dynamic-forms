import {IAbstractFormControlModel, IChangeListenerConfig} from "../item.struckts";

export class AbstractFormControlModel {

  key: string;
  controlType: string;
  config?: any[];

  formState?: any;
  disabled?: boolean;

  validator?: any;
  asyncValidator?: any;
  validatorMessages?: any;
  formatterParser?: any[];
  valueChangeSubscriptions?: IChangeListenerConfig[];

  label?: string;
  attrs?: any;
  controlClass?: string[];
  wrapperClass?: string[];

  constructor(options: IAbstractFormControlModel = {}) {
    this.key = options.key || '';
    this.controlType = options.controlType || '';

    this.label = options.label;
    this.attrs = options.attrs || {};
    this.formState = options.formState || null;
    this.disabled = options.disabled || null;

    this.validator = options.validator || [];
    this.validatorMessages = options.validatorMessages || {};
    this.asyncValidator = options.asyncValidator || [];
    this.formatterParser = options.formatterParser || [];
    this.valueChangeSubscriptions = options.valueChangeSubscriptions || [];
    this.controlClass = options.controlClass || [];
    this.wrapperClass = options.wrapperClass || [];
  }

}
