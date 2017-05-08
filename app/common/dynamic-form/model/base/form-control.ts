import {IAbstractFormControlModel, IChangeListenerConfig} from "../item.struckts";

export class AbstractFormControlModel {

  parentId?: string;
  key: string;
  formPath: string[] = [];
  controlType: string;
  config?: any[];

  formState?: any;
  disabled?: boolean;

  validator?: any;
  asyncValidator?: any;
  validatorMessages?: any;
  formatterParser?: any[];
  changeListener?: IChangeListenerConfig[];

  label?: string;
  attrs?: any;
  controlClass?: string[];
  wrapperClass?: string[];

  constructor(options: IAbstractFormControlModel = {}) {
    this.formPath = options.formPath || [];
    this.parentId = options.parentId || '';
    this.key = options.key || '';
    this.controlType = options.controlType || '';

    this.label = options.label;
    this.attrs = options.attrs;
    this.formState = options.formState;
    this.disabled = options.disabled;

    this.validator = options.validator || [];
    this.validatorMessages = options.validatorMessages || {};
    this.asyncValidator = options.asyncValidator || [];
    this.formatterParser = options.formatterParser || [];
    this.changeListener = options.changeListener || [];
    this.controlClass = options.controlClass || [];
    this.wrapperClass = options.wrapperClass || [];
  }

}
