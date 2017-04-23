import {AbstractFormControlModel} from "./base/form-control";
import {IAbstractControlOptions, buttonTypes, changeListenerConfig, IItemBaseOptions} from "./item.struckts";
import {ItemBase} from "./base/item";

export class ButtonItem extends ItemBase {
  controlType = 'button';
  type: buttonTypes;
  label:string;
  changeListener?:changeListenerConfig[];

  constructor(options:IItemBaseOptions = {}) {
    super(options);
    this.type = options['type'] || 'button';
    this.label = options = options['label'];
    this.changeListener = options['changeListener'];
  }

}
