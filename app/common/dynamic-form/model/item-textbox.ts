import { textboxTypes } from "./item-scruct";
import {AbstractFormControlModel} from "./base/form-control";

export class TextboxItem extends AbstractFormControlModel<string> {
  controlType = 'textbox';
  type: textboxTypes;
  placeholder?:string;

  constructor(options: {} = {}) {
    super(options);
    this.placeholder = options['placeholder'];
    this.type = options['type'] || 'text';
  }


}
