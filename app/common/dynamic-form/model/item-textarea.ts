import {AbstractFormControlModel} from "./base/form-control";
export class TextareaItem extends AbstractFormControlModel<string> {
  controlType = 'textarea';

  constructor(options: {} = {}) {
    super(options);
  }
}
