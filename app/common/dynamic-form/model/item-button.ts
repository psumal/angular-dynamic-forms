import {buttonTypes, changeListenerConfig, IItemBaseOptions, IAbstractControlOptions} from "./item.struckts";
import {ItemBase} from "./base/item";

export class ButtonItem extends ItemBase {
  controlType = 'button';
  type: buttonTypes;
  label:string;
  disabled:boolean;
  controlClass:string[] = [];
  changeListener?:changeListenerConfig[];

  constructor(options:IAbstractControlOptions = {}) {
    super(options);
    this.type = options['type'] || 'button';
    this.disabled = options.disabled;
    this.label = options = options['label'];
    this.controlClass = options.controlClass || [];
    this.changeListener = options['changeListener'];
  }

}
