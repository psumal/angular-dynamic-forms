import {buttonTypes, changeListenerConfig, IItemBaseOptions} from "./item.struckts";
import {ItemBase} from "./base/item";

export class ButtonItem extends ItemBase {
  controlType = 'button';
  type: buttonTypes;
  label:string;
  disabled:boolean;
  changeListener?:changeListenerConfig[];

  constructor(options:IItemBaseOptions = {}) {
    super(options);
    this.type = options['type'] || 'button';
    this.disabled = options.disabled;
    this.label = options = options['label'];
    this.changeListener = options['changeListener'];
  }

}
