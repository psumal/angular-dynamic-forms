import {AbstractFormControlModel} from "./base/form-control";

export class CheckboxItem extends AbstractFormControlModel {
  controlType = 'checkbox';
  type = 'checkbox';

  constructor(options:any = {}) {
    super(options);
  }

}
