import {AbstractFormControlModel} from "./base/form-control";

export class CheckboxItem extends AbstractFormControlModel<string> {
  controlType = 'checkbox';
  type = 'checkbox';

  constructor(options: {} = {}) {
    super(options);
  }

}
