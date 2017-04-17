import {AbstractFormControlModel} from "../../model/base/form-control";

export class ButtonItem extends AbstractFormControlModel<string> {
  controlType = 'button';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || 'submit';
  }
}
