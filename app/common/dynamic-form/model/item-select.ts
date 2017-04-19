import {AbstractFormControlModel} from "./base/form-control";

export class SelectItem extends AbstractFormControlModel<string> {
  controlType = 'select';
  options: {key: string, value: string}[] = [];
  visibleOptions:{key: string, value: string}[] = [];

  constructor(options: any = {}) {
    super(options);
    this.options = options['options'] || [];
    this.visibleOptions = this.options;
  }
}
