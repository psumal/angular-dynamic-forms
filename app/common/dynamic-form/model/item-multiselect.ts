import {AbstractFormControlModel} from "./base/form-control";

export class MultiselectItem extends AbstractFormControlModel<string> {
  controlType = 'multiselect';
  options: {key: string, value: string}[] = [];

  constructor(options: any = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
