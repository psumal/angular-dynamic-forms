import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractControlOptions, textboxTypes} from "./item.struckts";

export class TextboxItem extends AbstractFormControlModel<string> {
  controlType = 'textbox';
  type: textboxTypes;
  placeholder?:string;

  constructor(options:IAbstractControlOptions<string> = <any>{}) {
    super(options);
    this.placeholder = options['placeholder'];
    this.type = options['type'] || 'text';
  }

}
