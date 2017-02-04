import {Injectable}   from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn, AsyncValidatorFn, FormBuilder} from '@angular/forms';

import {ItemBase} from './item-base';
import {TextboxItem} from "./item-textbox";
import {MultiselectItem} from "./item-multiselect";
import {SelectItem} from "./item-select";
import {CheckboxItem} from "./item-checkbox";
import {RadioItem} from "./item-radio";
import {ItemService} from "../../../component/start/item.service";
import {ButtonItem} from "./item-button";
import {TextareaItem} from "./item-textarea";

@Injectable()
export class ItemControlService {

  static createFormGroup(formGroupStruct: {}) {

  }

  static createFormItem(config: {}): ItemBase<any> {

    if(!('controlType' in config)) {
      config['controlType'] = guessControlType(config);
    }

    let controlType: string = config['controlType'];
    let item: ItemBase<any>;

    console.log('controlType: ', controlType);

    if (controlType === "textbox") {
      item = new TextboxItem(config);
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

    return item;

    /////////////////////////////

    function guessControlType(struct:{}):string {
      let controlType:string;

      controlType = "textbox";

      return controlType;

    }
  }

  constructor() {

  }


}
