import {Injectable}   from '@angular/core';

import {TextboxItem} from "./model/item-textbox";
import {MultiselectItem} from "./model/item-multiselect";
import {SelectItem} from "./model/item-select";
import {CheckboxItem} from "./model/item-checkbox";
import {RadioItem} from "./model/item-radio";
import {ButtonItem} from "./model/item-button";
import {TextareaItem} from "./model/item-textarea";
import {FormGroupItem} from "./model/item-formGroup";
import {AbstractFormControlModel} from "./model/base/form-control";
import {ItemBase} from "./model/base/item";

@Injectable()
export class DynamicFormUtils {

  static createFormItem(config: {}): AbstractFormControlModel<any> | ButtonItem| FormGroupItem {
    //prevent side effects
    config = {...config};

    if(!('controlType' in config)) {
      config['controlType'] = guessControlType(config);
    }

    let controlType: string = config['controlType'];
    let item: AbstractFormControlModel<any>  | ButtonItem | FormGroupItem;

    if (controlType === "textbox") {
      item = new TextboxItem(<any>config);
    }

    if (controlType === "select") {
      item = new SelectItem(config);
    }

    if (controlType === "multiselect") {
      item = new MultiselectItem(config);
    }

    if (controlType === "checkbox") {
      item = new CheckboxItem(config);
    }

    if (controlType === "radio") {
      item = new RadioItem(config);
    }

    if (controlType === "textarea") {
      item = new TextareaItem(config);
    }

    if (controlType === "button") {
      item = new ButtonItem(config);
    }

    if(controlType === "formGroup") {
      item = new FormGroupItem(config);
    }

    return item;

    /////////////////////////////

    function guessControlType(struct:{}):string {
      let controlType:string;

      controlType = "textbox";

      return controlType;

    }
  }
}
