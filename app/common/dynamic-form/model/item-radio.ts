import {AbstractFormControlModel} from "./base/form-control";

export class RadioItem extends AbstractFormControlModel<string> {
  controlType = 'radio';
  type="radio";
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
